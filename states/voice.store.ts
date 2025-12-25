"use client";

import { create } from "zustand";
import { socket } from "@/lib/socket";

interface VoiceStore {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  roomId: string | null;
  isOpen: boolean; // UI flag
  isMuted: boolean;

  // Actions
  setLocalStream: (stream: MediaStream | null) => void;
  setRemoteStream: (stream: MediaStream | null) => void;
  setRoom: (roomId: string) => void;
  open: () => void;
  close: () => void;

  startCall: () => Promise<boolean>;
  endCall: () => void;
  toggleMute: () => void;
}

let peer: RTCPeerConnection | null = null;

export const useVoiceStore = create<VoiceStore>((set, get) => ({
  localStream: null,
  remoteStream: null,
  roomId: null,
  isOpen: false,
  isMuted: false,

  setLocalStream: (stream) => set({ localStream: stream }),
  setRemoteStream: (stream) => set({ remoteStream: stream }),
  setRoom: (roomId) => set({ roomId }),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),

  startCall: async () => {
    const roomId = get().roomId;
    if (!roomId) return false;

    const voiceStore = get();

    try {
      peer = new RTCPeerConnection({
        iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }],
      });

      // Get local audio
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      set({ localStream });

      // Add tracks to peer
      localStream.getTracks().forEach((track) => {
        peer!.addTrack(track, localStream);
      });

      // Remote stream
      const remoteStream = new MediaStream();
      set({ remoteStream });

      peer.ontrack = (event) => {
        event.streams[0].getTracks().forEach((t) => {
          remoteStream.addTrack(t);
        });
      };

      // ICE candidate handling
      peer.onicecandidate = (e) => {
        if (e.candidate) {
          socket.emit("voice-ice-candidate", {
            candidate: e.candidate,
            roomId,
          });
        }
      };

      // Create offer
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      socket.emit("voice-offer", { offer, roomId });

      // Listen for answer

      // Listen for answer
      socket.on(
        "voice-answer",
        async (data: { answer: RTCSessionDescriptionInit; roomId: string }) => {
          if (peer) {
            await peer.setRemoteDescription(data.answer);
          }
        },
      );

      // Listen for ICE candidates
      socket.on(
        "voice-ice-candidate",
        async (data: { candidate: RTCIceCandidateInit; roomId: string }) => {
          try {
            if (peer) {
              await peer.addIceCandidate(data.candidate);
            }
          } catch (e) {
            console.error("ICE error:", e);
          }
        },
      );

      // Listen for incoming offers (if you are the callee)

      socket.on(
        "voice-offer",
        async (data: { offer: RTCSessionDescriptionInit; roomId: string }) => {
          if (!peer) return;

          await peer.setRemoteDescription(data.offer);

          const answer = await peer.createAnswer();
          await peer.setLocalDescription(answer);

          socket.emit("voice-answer", { answer, roomId: data.roomId });
        },
      );

      return true;
    } catch (err) {
      console.error("Failed to start call:", err);
      return false;
    }
  },

  endCall: () => {
    // Close peer
    if (peer) {
      peer.close();
      peer = null;
    }

    const voiceStore = get();

    // Stop local tracks
    if (voiceStore.localStream) {
      voiceStore.localStream.getTracks().forEach((t) => t.stop());
      set({ localStream: null });
    }

    // Stop remote tracks
    if (voiceStore.remoteStream) {
      voiceStore.remoteStream.getTracks().forEach((t) => t.stop());
      set({ remoteStream: null });
    }

    // Cleanup listeners
    socket.off("voice-answer");
    socket.off("voice-offer");
    socket.off("voice-ice-candidate");

    set({ isOpen: false, roomId: null, isMuted: false });
  },

  toggleMute: () => {
    const localStream = get().localStream;
    if (!localStream) return;

    const enabled = !get().isMuted;
    localStream.getAudioTracks().forEach((t) => (t.enabled = enabled));
    set({ isMuted: !get().isMuted });
  },
}));

"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Header from "@/components/ui/header";
import { useVoiceStore } from "@/states/voice.store";
import { Mic, MicOff, Phone, PhoneOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function VoiceCall() {
  const [isMuted, setIsMuted] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [callTime, setCallTime] = useState(0);
  const callTimerRef = useRef<NodeJS.Timer | null>(null);

  const { localStream, remoteStream, startCall, endCall, toggleMute } =
    useVoiceStore();

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  // Attach media streams
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  // Call timer
  useEffect(() => {
    if (!isConnected) return;
    callTimerRef.current = setInterval(
      () => setCallTime((prev) => prev + 1),
      1000,
    );
    return () => {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
    };
  }, [isConnected]);

  const formatTime = (t: number) => {
    const minutes = Math.floor(t / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (t % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleCallToggle = async () => {
    if (isConnected) {
      endCall();
      setIsConnected(false);
      setCallTime(0);
      return;
    }
    const ok = await startCall();
    if (ok) setIsConnected(true);
  };

  const handleMute = () => {
    toggleMute();
    setIsMuted((prev) => !prev);
  };

  return (
    <div className="h-screen w-screen relative bg-black/60 backdrop-blur-md flex flex-col overflow-hidden">
      <Header />

      <div className="flex-1 flex items-center justify-center relative">
        {/* Remote Video Background */}
        {remoteStream && (
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Center Avatar + Ping Waves */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative">
            {isConnected && (
              <>
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary opacity-50 animate-ping"
                  style={{ width: 160, height: 160 }}
                />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary opacity-40 animate-ping delay-200"
                  style={{ width: 200, height: 200 }}
                />
              </>
            )}
            <Avatar className="h-32 w-32 shadow-xl">
              <AvatarFallback>V</AvatarFallback>
            </Avatar>
          </div>

          {/* Call Timer */}
          {isConnected && (
            <p className="text-white text-sm mt-4 font-mono">
              {formatTime(callTime)}
            </p>
          )}

          {/* Debug Info */}
          <div className="text-center text-xs mt-2 text-white/80">
            <p>Local: {localStream ? "🎤 Active" : "—"}</p>
            <p>Remote: {remoteStream ? "🎧 Connected" : "Waiting..."}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-16 flex gap-8 z-20">
          <button
            onClick={handleMute}
            disabled={!isConnected}
            className={`p-5 rounded-full shadow-lg transition ${
              isMuted
                ? "bg-destructive text-destructive-foreground"
                : "bg-muted hover:bg-accent"
            }`}
          >
            {isMuted ? (
              <MicOff className="h-6 w-6" />
            ) : (
              <Mic className="h-6 w-6" />
            )}
          </button>

          <button
            onClick={handleCallToggle}
            className={`p-5 rounded-full shadow-lg transition ${
              isConnected
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            {isConnected ? (
              <PhoneOff className="h-6 w-6" />
            ) : (
              <Phone className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Local Video Preview */}
      {localStream && (
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="absolute bottom-4 right-4 w-24 h-24 rounded-lg shadow-lg object-cover z-20"
        />
      )}
    </div>
  );
}

// "use client";

// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import Header from "@/components/ui/header";
// import { useVoiceStore } from "@/states/voice.store";
// import { Mic, MicOff, Phone, PhoneOff } from "lucide-react";
// import { useEffect, useRef, useState } from "react";

// export default function VoiceDemo() {
//   const [isMuted, setIsMuted] = useState(false);
//   const [isConnected, setIsConnected] = useState(false);
//   const [callTime, setCallTime] = useState(0);
//   const callTimerRef = useRef<NodeJS.Timer | null>(null);

//   const { localStream, remoteStream, startCall, endCall, toggleMute } =
//     useVoiceStore();

//   // Timer effect
//   useEffect(() => {
//     if (!isConnected) return;

//     callTimerRef.current = setInterval(() => {
//       setCallTime((prev) => prev + 1);
//     }, 1000);

//     return () => {
//       if (callTimerRef.current) clearInterval(callTimerRef.current);
//     };
//   }, [isConnected]);

//   // Format mm:ss
//   const formatTime = (t: number) => {
//     const minutes = Math.floor(t / 60)
//       .toString()
//       .padStart(2, "0");
//     const seconds = (t % 60).toString().padStart(2, "0");
//     return `${minutes}:${seconds}`;
//   };

//   const handleCallToggle = async () => {
//     if (isConnected) {
//       endCall();
//       setIsConnected(false);
//       setCallTime(0);
//       return;
//     }

//     const ok = await startCall();
//     if (ok) setIsConnected(true);
//   };

//   const handleMute = () => {
//     toggleMute();
//     setIsMuted((prev) => !prev);
//   };

//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     if (localVideoRef.current && localStream) {
//       localVideoRef.current.srcObject = localStream;
//     }
//   }, [localStream]);

//   useEffect(() => {
//     if (remoteVideoRef.current && remoteStream) {
//       remoteVideoRef.current.srcObject = remoteStream;
//     }
//   }, [remoteStream]);

//   return (
//     <div className="h-screen w-screen relative bg-black/60 backdrop-blur-md flex flex-col overflow-hidden">
//       <Header />

//       <div className="flex-1 flex items-center justify-center relative">
//         {/* Remote Video Preview */}
//         {remoteStream && (
//           <video
//             ref={remoteVideoRef}
//             autoPlay
//             playsInline
//             className="absolute inset-0 w-full h-full object-cover rounded-md"
//           />
//         )}

//         {/* Overlay for blur & dark background */}
//         <div className="absolute inset-0 bg-black/40 rounded-md"></div>

//         {/* Center Avatar + Waves */}
//         <div className="relative z-10 flex flex-col items-center">
//           <div className="relative">
//             {/* Animated waves */}
//             {isConnected && (
//               <>
//                 <div
//                   className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary opacity-50 animate-ping"
//                   style={{ width: "160px", height: "160px" }}
//                 ></div>
//                 <div
//                   className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary opacity-40 animate-ping delay-200"
//                   style={{ width: "200px", height: "200px" }}
//                 ></div>
//               </>
//             )}

//             {/* Main Avatar */}
//             <Avatar className="h-32 w-32 shadow-xl">
//               <AvatarFallback>V</AvatarFallback>
//             </Avatar>
//           </div>

//           {/* Call Timer */}
//           {isConnected && (
//             <p className="text-white text-sm mt-4 font-mono">
//               {formatTime(callTime)}
//             </p>
//           )}

//           {/* Debug info */}
//           <div className="text-center text-xs mt-2 text-white/80">
//             <p>Local: {localStream ? "🎤 Active" : "—"}</p>
//             <p>Remote: {remoteStream ? "🎧 Connected" : "Waiting..."}</p>
//           </div>
//         </div>

//         {/* Controls */}
//         <div className="absolute bottom-16 flex gap-8 z-20">
//           <button
//             onClick={handleMute}
//             disabled={!isConnected}
//             className={`p-5 rounded-full shadow-lg transition ${
//               isMuted
//                 ? "bg-destructive text-destructive-foreground"
//                 : "bg-muted hover:bg-accent"
//             }`}
//           >
//             {isMuted ? (
//               <MicOff className="h-6 w-6" />
//             ) : (
//               <Mic className="h-6 w-6" />
//             )}
//           </button>

//           <button
//             onClick={handleCallToggle}
//             className={`p-5 rounded-full shadow-lg transition ${
//               isConnected
//                 ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
//                 : "bg-primary text-primary-foreground hover:bg-primary/90"
//             }`}
//           >
//             {isConnected ? (
//               <PhoneOff className="h-6 w-6" />
//             ) : (
//               <Phone className="h-6 w-6" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Local Video Preview */}
//       {localStream && (
//         <video
//           ref={localVideoRef}
//           autoPlay
//           muted
//           playsInline
//           className="absolute bottom-4 right-4 w-24 h-24 rounded-lg shadow-lg object-cover z-20"
//         />
//       )}
//     </div>
//   );
// }

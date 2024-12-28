"use client";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Socket } from "socket.io";
import { io } from "socket.io-client";
import { Manager } from "socket.io-client";

const RenderNotification = (props: { button: React.ReactNode }) => {
  //   const manager = new Manager("ws://localhost:9000/v1/ws", {
  //     reconnectionDelayMax: 10000,
  //     extraHeaders: {
  //       Id: JSON.parse(localStorage.getItem("user_details") || "").id,
  //       socket_type: "notification",
  //     },
  //   });
  //   const ioConn = io("ws://localhost:9000", {
  //     path: "",
  //     extraHeaders: {
  //       Id: JSON.parse(localStorage.getItem("user_details") || "").id,
  //       socket_type: "notification",
  //     },
  //   });
  // const SOCKET_URL = "http://localhost:9000";
  // const [ioConn, setIoConn] = useState(null);
  // const [isConnected, setIsConnected] = useState(false);
  // const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log(
      "Initializing socket connection...",
      JSON.parse(localStorage.getItem("user_details") || "{}").id
    );

    // Initialize socket connection
    // const socket = io(SOCKET_URL, {
    //   transports: ["websocket"],
    //   path: "/v1/ws", // Ensure this matches your server's configured path
    //   query: {
    //     id: JSON.parse(localStorage.getItem("user_details") || "{}").id,
    //     socket_type: "notification",
    //   },
    // });

    // Handle connection events
    // socket.on("connect", () => {
    //   console.log("Socket connected");
    //   setIsConnected(true);
    // });

    // socket.on("disconnect", () => {
    //   console.log("Socket disconnected");
    //   setIsConnected(false);
    // });
    // socket.on("message", (data) => {
    //   console.log("mesbsbsss", data);
    //   setIsConnected(false);
    // });
    // // Handle incoming messages

    // setIoConn(socket);

    // // Cleanup on component unmount
    // return () => {
    //   console.log("Cleaning up socket connection...");
    //   socket.disconnect();
    // };
  }, []);
  const [open, setOpen] = useState(false);
  return (
    <>
      <span className="mt-2" onClick={() => setOpen(true)}>
        {props.button}
      </span>
      <Modal
        closeIcon={false}
        className="top-[60px] left-[420px]"
        mask={false}
        footer={null}
        title="Notifications"
        open={open}
        onCancel={() => setOpen(false)}
      >
        <h1>Notification</h1>
      </Modal>
    </>
  );
};

export default RenderNotification;

import {io} from "socket.io-client";
import { config } from "./config";

// Use centralized configuration
const socket = io(config.SOCKET_URL, { withCredentials: true });

export default socket;

import { Agent } from "../main/agent";

export type AgentWithScore<GenType, FitnessType> = { agent: Agent<GenType, FitnessType>; score: FitnessType };

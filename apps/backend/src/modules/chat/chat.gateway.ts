export type ChatMessage = {
  eventId: string;
  userId: string;
  message: string;
};

/**
 * Gateway simplificado: en implementación real se usaría @WebSocketGateway de NestJS.
 */
export class ChatGateway {
  canWrite(isConfirmedParticipant: boolean): boolean {
    return isConfirmedParticipant;
  }

  buildMessagePayload(input: ChatMessage) {
    return {
      ...input,
      sentAt: new Date().toISOString()
    };
  }
}

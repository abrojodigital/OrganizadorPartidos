class ChatGateway {
  canWrite(isConfirmedParticipant) {
    return isConfirmedParticipant;
  }

  buildMessagePayload(input) {
    return {
      ...input,
      sentAt: new Date().toISOString()
    };
  }
}

module.exports = { ChatGateway };

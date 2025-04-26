import { Request, Response, NextFunction } from 'express';
import saveusertodb from '/Users/soumya/Documents/my-monorepo/apps/backends/config/middleware/registermiddleware/saveusertodb.ts';
import { getChannel } from '/Users/soumya/Documents/my-monorepo/apps/backends/services/notifcationservice/notificationservice.ts';
import { Channel } from 'amqplib/callback_api.js'; // for proper typing

interface ExtendedRequest extends Request {
  saveusertodb?: {
    emailid?: string;
  };
}

const sendusertoqueue = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<void> => {
  const user = req.saveusertodb;

  if (!user || !user.emailid) {
    console.warn("User not found in request");
    return next();
  }

  const channel: Channel | null = getChannel();

  if (!channel) {
    console.warn("Channel not found");
    return next();
  }

  const message = JSON.stringify({ emailid: user.emailid });
  channel.sendToQueue("registrationqueue", Buffer.from(message), { persistent: true });

  next();
};

export default sendusertoqueue;

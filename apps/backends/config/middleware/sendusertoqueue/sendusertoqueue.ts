import { Request, Response, NextFunction } from 'express';
import saveusertodb from '../registermiddleware/saveusertodb';
import { getChannel } from '/Users/soumya/Documents/my-monorepo/apps/backends/services/notifcationservice/notificationservice';
import { Channel } from 'amqplib/callback_api'; // for proper typing

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

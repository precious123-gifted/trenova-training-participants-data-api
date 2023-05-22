import { NextApiRequest, NextApiResponse } from "next"
import { connectToMongoDB } from "../../../lib/mongodb/mongodb"
import User from "../../../models/user"
import { IUser } from "../../../types"




const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToMongoDB();

    if (req.method === "POST") {
      if (!req.body) return res.status(400).json({ error: "Data is missing" });

      const { participantName, schoolName, address, phoneNumber, email, createdDate } = req.body;

      const user = new User({
        participantName,
        schoolName,
        address,
        phoneNumber,
        email,
        createdDate
      });

      user.save()
        .then((data: IUser) => {
          const user = {
            participantName: data.participantName,
            schoolName: data.schoolName,
            address: data.address,
            phoneNumber: data.phoneNumber,
            email: data.email,
            _id: data._id,
            createdDate: data.createdDate,
          };

          return res.status(201)
            .setHeader('Access-Control-Allow-Origin', '*') // Replace with your domain name
            .setHeader('Access-Control-Allow-Credentials', 'true')
            .json({
              success: true,
              user
            });
        })
        .catch((error: unknown) => {
          console.error(error);
          res.status(500)
            .setHeader('Access-Control-Allow-Origin', '*') // Replace with your domain name
            .setHeader('Access-Control-Allow-Credentials', 'true')
            .json({ error: "Internal Server Error" });
        });
    } else if (req.method === "OPTIONS") {
      res.setHeader('Access-Control-Allow-Origin', '*'); // Replace with your domain name
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.status(200).end();
    } else {
      res.status(405)
        .setHeader('Access-Control-Allow-Origin', '*') // Replace with your domain name
        .setHeader('Access-Control-Allow-Credentials', 'true')
        .json({ error: "Method Not Allowed, please try a different method" });
    }
  } catch (error) {
    console.error(error);
    res.status(500)
      .setHeader('Access-Control-Allow-Origin', '*') // Replace with your domain name
      .setHeader('Access-Control-Allow-Credentials', 'true')
      .json({ error: "Internal Server Error" });
  }
};


export default handler



import * as nodemailer from 'nodemailer';
import Config from '../config/Mail';

interface To {
    name : string;
    address : string;
}

class Mail {

    constructor(
        public to?: To[],
        public subject?: string,
        public message?: string
    ) { }

    async sendMail(){

        const mailOptions = {
            from: Config.user,
            to: this.to,
            subject: this.subject,
            html: this.message
        };

        const transporter = nodemailer.createTransport({
            host: Config.host,
            port: Config.port,
            secure: Config.secure,
            auth: {
                user: Config.user,
                pass: Config.user,
            },
            tls: {
                rejectUnauthorized: false,
            }
        });

        return transporter.sendMail(mailOptions);
    }
}

export default new Mail; 
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT: number = parseInt(process.env.API_PORT!, 10);
const API_HOST: string = process.env.API_HOST!;

function main() {
    app.listen(PORT, API_HOST, () => {
        console.log(`Server running at port ${PORT}`);
    });
}

main();

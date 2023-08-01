
import dotenv from 'dotenv';

const env = dotenv.config().parsed;

/**
 * @author sivabharathy
 * 
 * database configurations 
 */
export const dbConfig = {
    
    MONGODB_URI : env.MONGODB_URI || '',

    CONNECTION_OPTIONS : { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }
}
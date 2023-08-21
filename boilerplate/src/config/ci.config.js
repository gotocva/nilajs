
/**
 * @author sivabharathy
 * 
 * CI configurations 
 */
export const ciConfig = {

    GITHUB : {
        branch: 'development',
        commands: [
            'cd sivabharathy.in/backend',
            'git stash',
            'git pull',
            'npm run build',
            'pm2 restart all'
        ]
    }
}


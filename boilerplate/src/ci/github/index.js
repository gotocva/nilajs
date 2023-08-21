import { ciConfig } from '@config/ci.config';
import { LOG } from '@log/index';
const { exec } = require("child_process");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const webhookHandler = async (req, res) => {

  if (req.body.ref.split("/")[req.body.ref.split("/").length - 1] == ciConfig.GITHUB.branch) {
    if (req.body.commits && req.body.commits.length > 0) {
      ciConfig.GITHUB.commands.forEach((command) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                LOG.error(command + ' - error : ' + error.message);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                LOG.error(command+' - stderr : ' +stderr);
                return;
            }
            console.log(`stdout: \n ${stdout}`);
            LOG.info(command+' - ' +stdout);
        });
      })
    }
  }
  return res.json({status: true, message: 'Webhook api '});
}
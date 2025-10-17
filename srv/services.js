const processReqHeader = require('./lib/processReqHeader');
const retrieveAuditLogs = require('./lib/retrieveAuditLogs');
const convertToText = require('./lib/convertToText');
const sendEmail = require('./lib/sendEmail');

module.exports = (srv) => {
    srv.on('retrieveAuditLogs', async (req) => {
        // const isJob = await processReqHeader(req);
        const auditLogData = await retrieveAuditLogs();
        const textFilePath = await convertToText(auditLogData);
        const result = await sendEmail(textFilePath);
        
        // if (isJob) {
        //     // For scheduled jobs, result is already sent via 202 status
        //     return result;
        // } else {
        //     return result;
        // }
        return result;
    });
}
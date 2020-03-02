'use strict';

const schema = `
    type RdioScannerTalkgroup {
        alphaTag: String
        dec: Int
        description: String
        group: String
        mode: String
        tag: String
    }
`;

module.exports = { schema };

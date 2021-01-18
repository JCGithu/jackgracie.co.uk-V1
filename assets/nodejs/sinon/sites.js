const sites = {
  youtube: {
    triggers: ['youtube.com', 'youtu.be'],
    regex: [/(?<=\/|v\=)([^".&?\/\s]{11})/gi],
  },
  periscope: {
    triggers: ['pscp.tv'],
    regex: [/(?<=\/w\/)[0-9A-Za-z]+/g, /(?<=\/)[0-9A-Za-z]{13}(?![\/\.])/g],
  },
  parliament: {
    triggers: ['parliament.tv'],
    regex: [/[0-9A-Za-z]+-[0-9A-Za-z]+-[0-9A-Za-z]+-[0-9A-Za-z]+-[0-9A-Za-z]+/g],
  },
};

module.exports = sites;

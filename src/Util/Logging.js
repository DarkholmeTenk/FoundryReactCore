export default function getLoggerFactory(modName) {
    return (feature)=>{
        let prefix = `${modName.toUpperCase()} | ${feature.toUpperCase()} | `
        let logger = function(message, ...args) {console.log(prefix + message, ...args)}
        logger.error = function(message, ...args) {console.error(prefix + message, ...args)}
        logger.warn = function(message, ...args) {console.warn(prefix + message, ...args)}
        logger.debug = function(message, ...args) {console.debug(prefix + message, ...args)}
        return logger
    }
}

export const FoundryReactCoreLogFactory = getLoggerFactory("FoundryReactCore")
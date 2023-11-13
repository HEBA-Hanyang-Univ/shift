import logging

# set logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
formatter = logging.Formatter('[%(levelname)s][%(asctime)s] >> %(message)s')
streamHandler = logging.StreamHandler()
streamHandler.setFormatter(formatter)
fileHandler = logging.FileHandler('./logs/server.log')
fileHandler.setFormatter(formatter)
logger.addHandler(streamHandler)
logger.addHandler(fileHandler)


var util = require('util');
var winston = require('winston');
var youtube_node = require('youtube-node');
var ConfigFile = require("../config.json");

function YoutubePlugin() {
  this.RickrollUrl = 'http://www.youtube.com/watch?v=oHg5SJYRHA0';
  this.youtube = new youtube_node();
  this.youtube.setKey(ConfigFile.api_keys.google_key);
}

YoutubePlugin.prototype.respond = function(query, channel, bot) {
  this.youtube.addParam('type', 'video');
  this.youtube.search(query, 1, function(error, result) {
    if (error) {
      //winston.error("Error querying youtube: " + error);
      bot.sendMessage(channel, "Error querying YouTube! (╯°□°）╯︵ ┻━┻");
    } else {
      if (!result || !result.items || result.items.length < 1) {
        //winston.error("No results from youtube");
        bot.sendMessage(channel, "No results! (╯°□°）╯︵ ┻━┻");
      } else {
        bot.sendMessage(channel, "http://www.youtube.com/watch?v=" + result.items[0].id.videoId);
      }
    }
  });
};

YoutubePlugin.prototype.query = function(query, callback) {
  this.youtube.addParam('type', 'video');
  this.youtube.search(query, 1, function(error, result) {
    if (error) {
      //winston.error("Error querying youtube: " + error);
      callback('err', -1);
    } else {
      if (!result || !result.items || result.items.length < 1) {
        //winston.error("No results from youtube");
        callback(null, 0);
      } else {
        callback(null, result.items[0].id.videoId);
      }
    }
  });
};

module.exports = YoutubePlugin;

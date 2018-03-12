
class StringUtil {
  /**
     * "2005-12-15T09:41:30.217Z"格式的日期转date
     * @param 日期字符串
     * @returns {*|Date}
     */
  static parseMyDate(str) {
    const pattern = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d+)Z/;
    return str.replace(pattern, '$1/$2/$3 $4:$5:$6');
  }

  static parseRequestDate(str) {
    const pattern = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d+)Z/;
    return str.replace(pattern, '$1/$2/$3');
  }

  /**
     * 得到该该时间距今多久以前
     * @param 时间戳
     * @returns {*|String}
     */
  static getTimeSpan(timeStamp): string {
    let timeSpan = new Date().getTime() - timeStamp;
    timeSpan /= 1000;
    timeSpan = parseInt(timeSpan, 10);
    if (timeSpan < 60) { return `${timeSpan.toString()}秒前`; }
    timeSpan /= 60;
    timeSpan = parseInt(timeSpan, 10);
    if (timeSpan < 60) {
      return `${timeSpan.toString()}分钟前`;
    }
    timeSpan /= 60;
    timeSpan = parseInt(timeSpan, 10);
    if (timeSpan < 24) {
      return `${timeSpan.toString()}小时前`;
    }
    timeSpan /= 24;
    timeSpan = parseInt(timeSpan, 10);
    if (timeSpan < 30) {
      return `${timeSpan.toString()}天前`;
    }
    timeSpan /= 30.42;
    timeSpan = parseInt(timeSpan, 10);
    if (timeSpan < 12) {
      return `${timeSpan.toString()}月前`;
    }
    timeSpan /= 12;
    timeSpan = parseInt(timeSpan, 10);
    return `${timeSpan.toString()}年前`;
  }

  static getPublishedTimeSpan(timeStr): string {
    return StringUtil.getTimeSpan(new Date(StringUtil.parseMyDate(timeStr)).getTime());
  }
}

module.exports = StringUtil;

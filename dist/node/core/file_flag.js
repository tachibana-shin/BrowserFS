var api_error = require('./api_error');
(function (ActionType) {
    ActionType[ActionType["NOP"] = 0] = "NOP";
    ActionType[ActionType["THROW_EXCEPTION"] = 1] = "THROW_EXCEPTION";
    ActionType[ActionType["TRUNCATE_FILE"] = 2] = "TRUNCATE_FILE";
    ActionType[ActionType["CREATE_FILE"] = 3] = "CREATE_FILE";
})(exports.ActionType || (exports.ActionType = {}));
var ActionType = exports.ActionType;
var FileFlag = (function () {
    function FileFlag(flagStr) {
        this.flagStr = flagStr;
        if (FileFlag.validFlagStrs.indexOf(flagStr) < 0) {
            throw new api_error.ApiError(api_error.ErrorCode.EINVAL, "Invalid flag: " + flagStr);
        }
    }
    FileFlag.getFileFlag = function (flagStr) {
        if (FileFlag.flagCache.hasOwnProperty(flagStr)) {
            return FileFlag.flagCache[flagStr];
        }
        return FileFlag.flagCache[flagStr] = new FileFlag(flagStr);
    };
    FileFlag.prototype.getFlagString = function () {
        return this.flagStr;
    };
    FileFlag.prototype.isReadable = function () {
        return this.flagStr.indexOf('r') !== -1 || this.flagStr.indexOf('+') !== -1;
    };
    FileFlag.prototype.isWriteable = function () {
        return this.flagStr.indexOf('w') !== -1 || this.flagStr.indexOf('a') !== -1 || this.flagStr.indexOf('+') !== -1;
    };
    FileFlag.prototype.isTruncating = function () {
        return this.flagStr.indexOf('w') !== -1;
    };
    FileFlag.prototype.isAppendable = function () {
        return this.flagStr.indexOf('a') !== -1;
    };
    FileFlag.prototype.isSynchronous = function () {
        return this.flagStr.indexOf('s') !== -1;
    };
    FileFlag.prototype.isExclusive = function () {
        return this.flagStr.indexOf('x') !== -1;
    };
    FileFlag.prototype.pathExistsAction = function () {
        if (this.isExclusive()) {
            return ActionType.THROW_EXCEPTION;
        }
        else if (this.isTruncating()) {
            return ActionType.TRUNCATE_FILE;
        }
        else {
            return ActionType.NOP;
        }
    };
    FileFlag.prototype.pathNotExistsAction = function () {
        if ((this.isWriteable() || this.isAppendable()) && this.flagStr !== 'r+') {
            return ActionType.CREATE_FILE;
        }
        else {
            return ActionType.THROW_EXCEPTION;
        }
    };
    FileFlag.flagCache = {};
    FileFlag.validFlagStrs = ['r', 'r+', 'rs', 'rs+', 'w', 'wx', 'w+', 'wx+', 'a', 'ax', 'a+', 'ax+'];
    return FileFlag;
})();
exports.FileFlag = FileFlag;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZV9mbGFnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvZmlsZV9mbGFnLnRzIl0sIm5hbWVzIjpbIkFjdGlvblR5cGUiLCJGaWxlRmxhZyIsIkZpbGVGbGFnLmNvbnN0cnVjdG9yIiwiRmlsZUZsYWcuZ2V0RmlsZUZsYWciLCJGaWxlRmxhZy5nZXRGbGFnU3RyaW5nIiwiRmlsZUZsYWcuaXNSZWFkYWJsZSIsIkZpbGVGbGFnLmlzV3JpdGVhYmxlIiwiRmlsZUZsYWcuaXNUcnVuY2F0aW5nIiwiRmlsZUZsYWcuaXNBcHBlbmRhYmxlIiwiRmlsZUZsYWcuaXNTeW5jaHJvbm91cyIsIkZpbGVGbGFnLmlzRXhjbHVzaXZlIiwiRmlsZUZsYWcucGF0aEV4aXN0c0FjdGlvbiIsIkZpbGVGbGFnLnBhdGhOb3RFeGlzdHNBY3Rpb24iXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sU0FBUyxXQUFXLGFBQWEsQ0FBQyxDQUFDO0FBSzFDLFdBQVksVUFBVTtJQUVwQkEseUNBQU9BLENBQUFBO0lBRVBBLGlFQUFtQkEsQ0FBQUE7SUFFbkJBLDZEQUFpQkEsQ0FBQUE7SUFFakJBLHlEQUFlQSxDQUFBQTtBQUNqQkEsQ0FBQ0EsRUFUVyxrQkFBVSxLQUFWLGtCQUFVLFFBU3JCO0FBVEQsSUFBWSxVQUFVLEdBQVYsa0JBU1gsQ0FBQTtBQXFCRDtJQTBCRUMsa0JBQVlBLE9BQWVBO1FBQ3pCQyxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxPQUFPQSxDQUFDQTtRQUN2QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDaERBLE1BQU1BLElBQUlBLFNBQVNBLENBQUNBLFFBQVFBLENBQUNBLFNBQVNBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLEVBQUVBLGdCQUFnQkEsR0FBR0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7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RUFBRUEsSUFBSUEsSUFBSUEsQ0FBQ0EsWUFBWUEsRUFBRUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsT0FBT0EsS0FBS0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDekVBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLFdBQVdBLENBQUNBO1FBQ2hDQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNOQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQSxlQUFlQSxDQUFDQTtRQUNwQ0EsQ0FBQ0E7SUFDSEEsQ0FBQ0E7SUF6R2NYLGtCQUFTQSxHQUFpQ0EsRUFBRUEsQ0FBQ0E7SUFFN0NBLHNCQUFhQSxHQUFHQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQTtJQXdHMUdBLGVBQUNBO0FBQURBLENBQUNBLEFBNUdELElBNEdDO0FBNUdZLGdCQUFRLFdBNEdwQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwaV9lcnJvciA9IHJlcXVpcmUoJy4vYXBpX2Vycm9yJyk7XG5cbi8qKlxuICogQGNsYXNzXG4gKi9cbmV4cG9ydCBlbnVtIEFjdGlvblR5cGUge1xuICAvLyBJbmRpY2F0ZXMgdGhhdCB0aGUgY29kZSBzaG91bGQgbm90IGRvIGFueXRoaW5nLlxuICBOT1AgPSAwLFxuICAvLyBJbmRpY2F0ZXMgdGhhdCB0aGUgY29kZSBzaG91bGQgdGhyb3cgYW4gZXhjZXB0aW9uLlxuICBUSFJPV19FWENFUFRJT04gPSAxLFxuICAvLyBJbmRpY2F0ZXMgdGhhdCB0aGUgY29kZSBzaG91bGQgdHJ1bmNhdGUgdGhlIGZpbGUsIGJ1dCBvbmx5IGlmIGl0IGlzIGEgZmlsZS5cbiAgVFJVTkNBVEVfRklMRSA9IDIsXG4gIC8vIEluZGljYXRlcyB0aGF0IHRoZSBjb2RlIHNob3VsZCBjcmVhdGUgdGhlIGZpbGUuXG4gIENSRUFURV9GSUxFID0gM1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgb25lIG9mIHRoZSBmb2xsb3dpbmcgZmlsZSBmbGFncy4gQSBjb252ZW5pZW5jZSBvYmplY3QuXG4gKlxuICogKiBgJ3InYCAtIE9wZW4gZmlsZSBmb3IgcmVhZGluZy4gQW4gZXhjZXB0aW9uIG9jY3VycyBpZiB0aGUgZmlsZSBkb2VzIG5vdCBleGlzdC5cbiAqICogYCdyKydgIC0gT3BlbiBmaWxlIGZvciByZWFkaW5nIGFuZCB3cml0aW5nLiBBbiBleGNlcHRpb24gb2NjdXJzIGlmIHRoZSBmaWxlIGRvZXMgbm90IGV4aXN0LlxuICogKiBgJ3JzJ2AgLSBPcGVuIGZpbGUgZm9yIHJlYWRpbmcgaW4gc3luY2hyb25vdXMgbW9kZS4gSW5zdHJ1Y3RzIHRoZSBmaWxlc3lzdGVtIHRvIG5vdCBjYWNoZSB3cml0ZXMuXG4gKiAqIGAncnMrJ2AgLSBPcGVuIGZpbGUgZm9yIHJlYWRpbmcgYW5kIHdyaXRpbmcsIGFuZCBvcGVucyB0aGUgZmlsZSBpbiBzeW5jaHJvbm91cyBtb2RlLlxuICogKiBgJ3cnYCAtIE9wZW4gZmlsZSBmb3Igd3JpdGluZy4gVGhlIGZpbGUgaXMgY3JlYXRlZCAoaWYgaXQgZG9lcyBub3QgZXhpc3QpIG9yIHRydW5jYXRlZCAoaWYgaXQgZXhpc3RzKS5cbiAqICogYCd3eCdgIC0gTGlrZSAndycgYnV0IG9wZW5zIHRoZSBmaWxlIGluIGV4Y2x1c2l2ZSBtb2RlLlxuICogKiBgJ3crJ2AgLSBPcGVuIGZpbGUgZm9yIHJlYWRpbmcgYW5kIHdyaXRpbmcuIFRoZSBmaWxlIGlzIGNyZWF0ZWQgKGlmIGl0IGRvZXMgbm90IGV4aXN0KSBvciB0cnVuY2F0ZWQgKGlmIGl0IGV4aXN0cykuXG4gKiAqIGAnd3grJ2AgLSBMaWtlICd3KycgYnV0IG9wZW5zIHRoZSBmaWxlIGluIGV4Y2x1c2l2ZSBtb2RlLlxuICogKiBgJ2EnYCAtIE9wZW4gZmlsZSBmb3IgYXBwZW5kaW5nLiBUaGUgZmlsZSBpcyBjcmVhdGVkIGlmIGl0IGRvZXMgbm90IGV4aXN0LlxuICogKiBgJ2F4J2AgLSBMaWtlICdhJyBidXQgb3BlbnMgdGhlIGZpbGUgaW4gZXhjbHVzaXZlIG1vZGUuXG4gKiAqIGAnYSsnYCAtIE9wZW4gZmlsZSBmb3IgcmVhZGluZyBhbmQgYXBwZW5kaW5nLiBUaGUgZmlsZSBpcyBjcmVhdGVkIGlmIGl0IGRvZXMgbm90IGV4aXN0LlxuICogKiBgJ2F4KydgIC0gTGlrZSAnYSsnIGJ1dCBvcGVucyB0aGUgZmlsZSBpbiBleGNsdXNpdmUgbW9kZS5cbiAqXG4gKiBFeGNsdXNpdmUgbW9kZSBlbnN1cmVzIHRoYXQgdGhlIGZpbGUgcGF0aCBpcyBuZXdseSBjcmVhdGVkLlxuICogQGNsYXNzXG4gKi9cbmV4cG9ydCBjbGFzcyBGaWxlRmxhZyB7XG4gIC8vIENvbnRhaW5zIGNhY2hlZCBGaWxlTW9kZSBpbnN0YW5jZXMuXG4gIHByaXZhdGUgc3RhdGljIGZsYWdDYWNoZTogeyBbbW9kZTogc3RyaW5nXTogRmlsZUZsYWcgfSA9IHt9O1xuICAvLyBBcnJheSBvZiB2YWxpZCBtb2RlIHN0cmluZ3MuXG4gIHByaXZhdGUgc3RhdGljIHZhbGlkRmxhZ1N0cnMgPSBbJ3InLCAncisnLCAncnMnLCAncnMrJywgJ3cnLCAnd3gnLCAndysnLCAnd3grJywgJ2EnLCAnYXgnLCAnYSsnLCAnYXgrJ107XG5cbiAgLyoqXG4gICAqIEdldCBhbiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBnaXZlbiBmaWxlIG1vZGUuXG4gICAqIEBwYXJhbSBbU3RyaW5nXSBtb2RlU3RyIFRoZSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBtb2RlXG4gICAqIEByZXR1cm4gW0Jyb3dzZXJGUy5GaWxlTW9kZV0gVGhlIEZpbGVNb2RlIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIG1vZGVcbiAgICogQHRocm93IFtCcm93c2VyRlMuQXBpRXJyb3JdIHdoZW4gdGhlIG1vZGUgc3RyaW5nIGlzIGludmFsaWRcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0RmlsZUZsYWcoZmxhZ1N0cjogc3RyaW5nKTogRmlsZUZsYWcge1xuICAgIC8vIENoZWNrIGNhY2hlIGZpcnN0LlxuICAgIGlmIChGaWxlRmxhZy5mbGFnQ2FjaGUuaGFzT3duUHJvcGVydHkoZmxhZ1N0cikpIHtcbiAgICAgIHJldHVybiBGaWxlRmxhZy5mbGFnQ2FjaGVbZmxhZ1N0cl07XG4gICAgfVxuICAgIHJldHVybiBGaWxlRmxhZy5mbGFnQ2FjaGVbZmxhZ1N0cl0gPSBuZXcgRmlsZUZsYWcoZmxhZ1N0cik7XG4gIH1cblxuICBwcml2YXRlIGZsYWdTdHI6IHN0cmluZztcbiAgLyoqXG4gICAqIFRoaXMgc2hvdWxkIG5ldmVyIGJlIGNhbGxlZCBkaXJlY3RseS5cbiAgICogQHBhcmFtIFtTdHJpbmddIG1vZGVTdHIgVGhlIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIG1vZGVcbiAgICogQHRocm93IFtCcm93c2VyRlMuQXBpRXJyb3JdIHdoZW4gdGhlIG1vZGUgc3RyaW5nIGlzIGludmFsaWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKGZsYWdTdHI6IHN0cmluZykge1xuICAgIHRoaXMuZmxhZ1N0ciA9IGZsYWdTdHI7XG4gICAgaWYgKEZpbGVGbGFnLnZhbGlkRmxhZ1N0cnMuaW5kZXhPZihmbGFnU3RyKSA8IDApIHtcbiAgICAgIHRocm93IG5ldyBhcGlfZXJyb3IuQXBpRXJyb3IoYXBpX2Vycm9yLkVycm9yQ29kZS5FSU5WQUwsIFwiSW52YWxpZCBmbGFnOiBcIiArIGZsYWdTdHIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHVuZGVybHlpbmcgZmxhZyBzdHJpbmcgZm9yIHRoaXMgZmxhZy5cbiAgICovXG4gIHB1YmxpYyBnZXRGbGFnU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZmxhZ1N0cjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGZpbGUgaXMgcmVhZGFibGUuXG4gICAqIEByZXR1cm4gW0Jvb2xlYW5dXG4gICAqL1xuICBwdWJsaWMgaXNSZWFkYWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5mbGFnU3RyLmluZGV4T2YoJ3InKSAhPT0gLTEgfHwgdGhpcy5mbGFnU3RyLmluZGV4T2YoJysnKSAhPT0gLTE7XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZmlsZSBpcyB3cml0ZWFibGUuXG4gICAqIEByZXR1cm4gW0Jvb2xlYW5dXG4gICAqL1xuICBwdWJsaWMgaXNXcml0ZWFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZmxhZ1N0ci5pbmRleE9mKCd3JykgIT09IC0xIHx8IHRoaXMuZmxhZ1N0ci5pbmRleE9mKCdhJykgIT09IC0xIHx8IHRoaXMuZmxhZ1N0ci5pbmRleE9mKCcrJykgIT09IC0xO1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGZpbGUgbW9kZSBzaG91bGQgdHJ1bmNhdGUuXG4gICAqIEByZXR1cm4gW0Jvb2xlYW5dXG4gICAqL1xuICBwdWJsaWMgaXNUcnVuY2F0aW5nKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmZsYWdTdHIuaW5kZXhPZigndycpICE9PSAtMTtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBmaWxlIGlzIGFwcGVuZGFibGUuXG4gICAqIEByZXR1cm4gW0Jvb2xlYW5dXG4gICAqL1xuICBwdWJsaWMgaXNBcHBlbmRhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmZsYWdTdHIuaW5kZXhPZignYScpICE9PSAtMTtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBmaWxlIGlzIG9wZW4gaW4gc3luY2hyb25vdXMgbW9kZS5cbiAgICogQHJldHVybiBbQm9vbGVhbl1cbiAgICovXG4gIHB1YmxpYyBpc1N5bmNocm9ub3VzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmZsYWdTdHIuaW5kZXhPZigncycpICE9PSAtMTtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBmaWxlIGlzIG9wZW4gaW4gZXhjbHVzaXZlIG1vZGUuXG4gICAqIEByZXR1cm4gW0Jvb2xlYW5dXG4gICAqL1xuICBwdWJsaWMgaXNFeGNsdXNpdmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZmxhZ1N0ci5pbmRleE9mKCd4JykgIT09IC0xO1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIG9uZSBvZiB0aGUgc3RhdGljIGZpZWxkcyBvbiB0aGlzIG9iamVjdCB0aGF0IGluZGljYXRlcyB0aGVcbiAgICogYXBwcm9wcmlhdGUgcmVzcG9uc2UgdG8gdGhlIHBhdGggZXhpc3RpbmcuXG4gICAqIEByZXR1cm4gW051bWJlcl1cbiAgICovXG4gIHB1YmxpYyBwYXRoRXhpc3RzQWN0aW9uKCk6IEFjdGlvblR5cGUge1xuICAgIGlmICh0aGlzLmlzRXhjbHVzaXZlKCkpIHtcbiAgICAgIHJldHVybiBBY3Rpb25UeXBlLlRIUk9XX0VYQ0VQVElPTjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNUcnVuY2F0aW5nKCkpIHtcbiAgICAgIHJldHVybiBBY3Rpb25UeXBlLlRSVU5DQVRFX0ZJTEU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBBY3Rpb25UeXBlLk5PUDtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgb25lIG9mIHRoZSBzdGF0aWMgZmllbGRzIG9uIHRoaXMgb2JqZWN0IHRoYXQgaW5kaWNhdGVzIHRoZVxuICAgKiBhcHByb3ByaWF0ZSByZXNwb25zZSB0byB0aGUgcGF0aCBub3QgZXhpc3RpbmcuXG4gICAqIEByZXR1cm4gW051bWJlcl1cbiAgICovXG4gIHB1YmxpYyBwYXRoTm90RXhpc3RzQWN0aW9uKCk6IEFjdGlvblR5cGUge1xuICAgIGlmICgodGhpcy5pc1dyaXRlYWJsZSgpIHx8IHRoaXMuaXNBcHBlbmRhYmxlKCkpICYmIHRoaXMuZmxhZ1N0ciAhPT0gJ3IrJykge1xuICAgICAgcmV0dXJuIEFjdGlvblR5cGUuQ1JFQVRFX0ZJTEU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBBY3Rpb25UeXBlLlRIUk9XX0VYQ0VQVElPTjtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
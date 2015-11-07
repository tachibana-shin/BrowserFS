(function (FileType) {
    FileType[FileType["FILE"] = 32768] = "FILE";
    FileType[FileType["DIRECTORY"] = 16384] = "DIRECTORY";
    FileType[FileType["SYMLINK"] = 40960] = "SYMLINK";
})(exports.FileType || (exports.FileType = {}));
var FileType = exports.FileType;
var Stats = (function () {
    function Stats(item_type, size, mode, atime, mtime, ctime) {
        if (atime === void 0) { atime = new Date(); }
        if (mtime === void 0) { mtime = new Date(); }
        if (ctime === void 0) { ctime = new Date(); }
        this.size = size;
        this.mode = mode;
        this.atime = atime;
        this.mtime = mtime;
        this.ctime = ctime;
        this.dev = 0;
        this.ino = 0;
        this.rdev = 0;
        this.nlink = 1;
        this.blksize = 4096;
        this.uid = 0;
        this.gid = 0;
        this.birthtime = new Date(0);
        this.file_data = null;
        if (this.mode == null) {
            switch (item_type) {
                case FileType.FILE:
                    this.mode = 0x1a4;
                    break;
                case FileType.DIRECTORY:
                default:
                    this.mode = 0x1ff;
            }
        }
        this.blocks = Math.ceil(size / 512);
        if (this.mode < 0x1000) {
            this.mode |= item_type;
        }
    }
    Stats.prototype.toBuffer = function () {
        var buffer = new Buffer(32);
        buffer.writeUInt32LE(this.size, 0);
        buffer.writeUInt32LE(this.mode, 4);
        buffer.writeDoubleLE(this.atime.getTime(), 8);
        buffer.writeDoubleLE(this.mtime.getTime(), 16);
        buffer.writeDoubleLE(this.ctime.getTime(), 24);
        return buffer;
    };
    Stats.fromBuffer = function (buffer) {
        var size = buffer.readUInt32LE(0), mode = buffer.readUInt32LE(4), atime = buffer.readDoubleLE(8), mtime = buffer.readDoubleLE(16), ctime = buffer.readDoubleLE(24);
        return new Stats(mode & 0xF000, size, mode & 0xFFF, new Date(atime), new Date(mtime), new Date(ctime));
    };
    Stats.prototype.clone = function () {
        return new Stats(this.mode & 0xF000, this.size, this.mode & 0xFFF, this.atime, this.mtime, this.ctime);
    };
    Stats.prototype.isFile = function () {
        return (this.mode & 0xF000) === FileType.FILE;
    };
    Stats.prototype.isDirectory = function () {
        return (this.mode & 0xF000) === FileType.DIRECTORY;
    };
    Stats.prototype.isSymbolicLink = function () {
        return (this.mode & 0xF000) === FileType.SYMLINK;
    };
    Stats.prototype.chmod = function (mode) {
        this.mode = (this.mode & 0xF000) | mode;
    };
    Stats.prototype.isSocket = function () {
        return false;
    };
    Stats.prototype.isBlockDevice = function () {
        return false;
    };
    Stats.prototype.isCharacterDevice = function () {
        return false;
    };
    Stats.prototype.isFIFO = function () {
        return false;
    };
    return Stats;
})();
exports.Stats = Stats;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9mc19zdGF0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL25vZGVfZnNfc3RhdHMudHMiXSwibmFtZXMiOlsiRmlsZVR5cGUiLCJTdGF0cyIsIlN0YXRzLmNvbnN0cnVjdG9yIiwiU3RhdHMudG9CdWZmZXIiLCJTdGF0cy5mcm9tQnVmZmVyIiwiU3RhdHMuY2xvbmUiLCJTdGF0cy5pc0ZpbGUiLCJTdGF0cy5pc0RpcmVjdG9yeSIsIlN0YXRzLmlzU3ltYm9saWNMaW5rIiwiU3RhdHMuY2htb2QiLCJTdGF0cy5pc1NvY2tldCIsIlN0YXRzLmlzQmxvY2tEZXZpY2UiLCJTdGF0cy5pc0NoYXJhY3RlckRldmljZSIsIlN0YXRzLmlzRklGTyJdLCJtYXBwaW5ncyI6IkFBTUEsV0FBWSxRQUFRO0lBQ2xCQSwyQ0FBYUEsQ0FBQUE7SUFDYkEscURBQWtCQSxDQUFBQTtJQUNsQkEsaURBQWdCQSxDQUFBQTtBQUNsQkEsQ0FBQ0EsRUFKVyxnQkFBUSxLQUFSLGdCQUFRLFFBSW5CO0FBSkQsSUFBWSxRQUFRLEdBQVIsZ0JBSVgsQ0FBQTtBQVVEO0lBcUNFQyxlQUNFQSxTQUFtQkEsRUFDWkEsSUFBWUEsRUFDWkEsSUFBYUEsRUFDYkEsS0FBd0JBLEVBQ3hCQSxLQUF3QkEsRUFDeEJBLEtBQXdCQTtRQUYvQkMscUJBQStCQSxHQUEvQkEsWUFBeUJBLElBQUlBLEVBQUVBO1FBQy9CQSxxQkFBK0JBLEdBQS9CQSxZQUF5QkEsSUFBSUEsRUFBRUE7UUFDL0JBLHFCQUErQkEsR0FBL0JBLFlBQXlCQSxJQUFJQSxFQUFFQTtRQUp4QkEsU0FBSUEsR0FBSkEsSUFBSUEsQ0FBUUE7UUFDWkEsU0FBSUEsR0FBSkEsSUFBSUEsQ0FBU0E7UUFDYkEsVUFBS0EsR0FBTEEsS0FBS0EsQ0FBbUJBO1FBQ3hCQSxVQUFLQSxHQUFMQSxLQUFLQSxDQUFtQkE7UUFDeEJBLFVBQUtBLEdBQUxBLEtBQUtBLENBQW1CQTtRQW5DMUJBLFFBQUdBLEdB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LE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO0lBQ2ZBLENBQUNBO0lBRU1ULDZCQUFhQSxHQUFwQkE7UUFDRVUsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7SUFDZkEsQ0FBQ0E7SUFFTVYsaUNBQWlCQSxHQUF4QkE7UUFDRVcsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7SUFDZkEsQ0FBQ0E7SUFFTVgsc0JBQU1BLEdBQWJBO1FBQ0VZLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO0lBQ2ZBLENBQUNBO0lBQ0haLFlBQUNBO0FBQURBLENBQUNBLEFBeklELElBeUlDO0FBeklZLGFBQUssUUF5SWpCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgPSByZXF1aXJlKCdmcycpO1xuaW1wb3J0IGZpbGUgPSByZXF1aXJlKCcuL2ZpbGUnKTtcblxuLyoqXG4gKiBJbmRpY2F0ZXMgdGhlIHR5cGUgb2YgdGhlIGdpdmVuIGZpbGUuIEFwcGxpZWQgdG8gJ21vZGUnLlxuICovXG5leHBvcnQgZW51bSBGaWxlVHlwZSB7XG4gIEZJTEUgPSAweDgwMDAsXG4gIERJUkVDVE9SWSA9IDB4NDAwMCxcbiAgU1lNTElOSyA9IDB4QTAwMFxufVxuXG4vKipcbiAqIEVtdWxhdGlvbiBvZiBOb2RlJ3MgYGZzLlN0YXRzYCBvYmplY3QuXG4gKlxuICogQXR0cmlidXRlIGRlc2NyaXB0aW9ucyBhcmUgZnJvbSBgbWFuIDIgc3RhdCdcbiAqIEBzZWUgaHR0cDovL25vZGVqcy5vcmcvYXBpL2ZzLmh0bWwjZnNfY2xhc3NfZnNfc3RhdHNcbiAqIEBzZWUgaHR0cDovL21hbjcub3JnL2xpbnV4L21hbi1wYWdlcy9tYW4yL3N0YXQuMi5odG1sXG4gKiBAY2xhc3NcbiAqL1xuZXhwb3J0IGNsYXNzIFN0YXRzIGltcGxlbWVudHMgZnMuU3RhdHMge1xuICBwdWJsaWMgYmxvY2tzOiBudW1iZXI7XG4gIC8qKlxuICAgKiBVTlNVUFBPUlRFRCBBVFRSSUJVVEVTXG4gICAqIEkgYXNzdW1lIG5vIG9uZSBpcyBnb2luZyB0byBuZWVkIHRoZXNlIGRldGFpbHMsIGFsdGhvdWdoIHdlIGNvdWxkIGZha2VcbiAgICogYXBwcm9wcmlhdGUgdmFsdWVzIGlmIG5lZWQgYmUuXG4gICAqL1xuICAvLyBJRCBvZiBkZXZpY2UgY29udGFpbmluZyBmaWxlXG4gIHB1YmxpYyBkZXY6IG51bWJlciA9IDA7XG4gIC8vIGlub2RlIG51bWJlclxuICBwdWJsaWMgaW5vOiBudW1iZXIgPSAwO1xuICAvLyBkZXZpY2UgSUQgKGlmIHNwZWNpYWwgZmlsZSlcbiAgcHVibGljIHJkZXY6IG51bWJlciA9IDA7XG4gIC8vIG51bWJlciBvZiBoYXJkIGxpbmtzXG4gIHB1YmxpYyBubGluazogbnVtYmVyID0gMTtcbiAgLy8gYmxvY2tzaXplIGZvciBmaWxlIHN5c3RlbSBJL09cbiAgcHVibGljIGJsa3NpemU6IG51bWJlciA9IDQwOTY7XG4gIC8vIEB0b2RvIE1heWJlIHN1cHBvcnQgdGhlc2U/IGF0bSwgaXQncyBhIG9uZS11c2VyIGZpbGVzeXN0ZW0uXG4gIC8vIHVzZXIgSUQgb2Ygb3duZXJcbiAgcHVibGljIHVpZDogbnVtYmVyID0gMDtcbiAgLy8gZ3JvdXAgSUQgb2Ygb3duZXJcbiAgcHVibGljIGdpZDogbnVtYmVyID0gMDtcbiAgLy8gdGltZSBmaWxlIHdhcyBjcmVhdGVkIChjdXJyZW50bHkgdW5zdXBwb3J0ZWQpXG4gIHB1YmxpYyBiaXJ0aHRpbWU6IERhdGUgPSBuZXcgRGF0ZSgwKTtcbiAgLy8gWFhYOiBTb21lIGZpbGUgc3lzdGVtcyBzdGFzaCBkYXRhIG9uIHN0YXRzIG9iamVjdHMuXG4gIHB1YmxpYyBmaWxlX2RhdGE6IE5vZGVCdWZmZXIgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBQcm92aWRlcyBpbmZvcm1hdGlvbiBhYm91dCBhIHBhcnRpY3VsYXIgZW50cnkgaW4gdGhlIGZpbGUgc3lzdGVtLlxuICAgKiBAcGFyYW0gW051bWJlcl0gaXRlbV90eXBlIHR5cGUgb2YgdGhlIGl0ZW0gKEZJTEUsIERJUkVDVE9SWSwgU1lNTElOSywgb3IgU09DS0VUKVxuICAgKiBAcGFyYW0gW051bWJlcl0gc2l6ZSBTaXplIG9mIHRoZSBpdGVtIGluIGJ5dGVzLiBGb3IgZGlyZWN0b3JpZXMvc3ltbGlua3MsXG4gICAqICAgdGhpcyBpcyBub3JtYWxseSB0aGUgc2l6ZSBvZiB0aGUgc3RydWN0IHRoYXQgcmVwcmVzZW50cyB0aGUgaXRlbS5cbiAgICogQHBhcmFtIFtOdW1iZXJdIG1vZGUgVW5peC1zdHlsZSBmaWxlIG1vZGUgKGUuZy4gMG82NDQpXG4gICAqIEBwYXJhbSBbRGF0ZT9dIGF0aW1lIHRpbWUgb2YgbGFzdCBhY2Nlc3NcbiAgICogQHBhcmFtIFtEYXRlP10gbXRpbWUgdGltZSBvZiBsYXN0IG1vZGlmaWNhdGlvblxuICAgKiBAcGFyYW0gW0RhdGU/XSBjdGltZSB0aW1lIG9mIGNyZWF0aW9uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBpdGVtX3R5cGU6IEZpbGVUeXBlLFxuICAgIHB1YmxpYyBzaXplOiBudW1iZXIsXG4gICAgcHVibGljIG1vZGU/OiBudW1iZXIsXG4gICAgcHVibGljIGF0aW1lOiBEYXRlID0gbmV3IERhdGUoKSxcbiAgICBwdWJsaWMgbXRpbWU6IERhdGUgPSBuZXcgRGF0ZSgpLFxuICAgIHB1YmxpYyBjdGltZTogRGF0ZSA9IG5ldyBEYXRlKCkpIHtcbiAgICBpZiAodGhpcy5tb2RlID09IG51bGwpIHtcbiAgICAgIHN3aXRjaChpdGVtX3R5cGUpIHtcbiAgICAgICAgY2FzZSBGaWxlVHlwZS5GSUxFOlxuICAgICAgICAgIHRoaXMubW9kZSA9IDB4MWE0O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEZpbGVUeXBlLkRJUkVDVE9SWTpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aGlzLm1vZGUgPSAweDFmZjtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gbnVtYmVyIG9mIDUxMkIgYmxvY2tzIGFsbG9jYXRlZFxuICAgIHRoaXMuYmxvY2tzID0gTWF0aC5jZWlsKHNpemUgLyA1MTIpO1xuICAgIC8vIENoZWNrIGlmIG1vZGUgYWxzbyBpbmNsdWRlcyB0b3AtbW9zdCBiaXRzLCB3aGljaCBpbmRpY2F0ZSB0aGUgZmlsZSdzXG4gICAgLy8gdHlwZS5cbiAgICBpZiAodGhpcy5tb2RlIDwgMHgxMDAwKSB7XG4gICAgICB0aGlzLm1vZGUgfD0gaXRlbV90eXBlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB0b0J1ZmZlcigpOiBCdWZmZXIge1xuICAgIHZhciBidWZmZXIgPSBuZXcgQnVmZmVyKDMyKTtcbiAgICBidWZmZXIud3JpdGVVSW50MzJMRSh0aGlzLnNpemUsIDApO1xuICAgIGJ1ZmZlci53cml0ZVVJbnQzMkxFKHRoaXMubW9kZSwgNCk7XG4gICAgYnVmZmVyLndyaXRlRG91YmxlTEUodGhpcy5hdGltZS5nZXRUaW1lKCksIDgpO1xuICAgIGJ1ZmZlci53cml0ZURvdWJsZUxFKHRoaXMubXRpbWUuZ2V0VGltZSgpLCAxNik7XG4gICAgYnVmZmVyLndyaXRlRG91YmxlTEUodGhpcy5jdGltZS5nZXRUaW1lKCksIDI0KTtcbiAgICByZXR1cm4gYnVmZmVyO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmcm9tQnVmZmVyKGJ1ZmZlcjogQnVmZmVyKTogU3RhdHMge1xuICAgIHZhciBzaXplID0gYnVmZmVyLnJlYWRVSW50MzJMRSgwKSxcbiAgICAgIG1vZGUgPSBidWZmZXIucmVhZFVJbnQzMkxFKDQpLFxuICAgICAgYXRpbWUgPSBidWZmZXIucmVhZERvdWJsZUxFKDgpLFxuICAgICAgbXRpbWUgPSBidWZmZXIucmVhZERvdWJsZUxFKDE2KSxcbiAgICAgIGN0aW1lID0gYnVmZmVyLnJlYWREb3VibGVMRSgyNCk7XG5cbiAgICByZXR1cm4gbmV3IFN0YXRzKG1vZGUgJiAweEYwMDAsIHNpemUsIG1vZGUgJiAweEZGRiwgbmV3IERhdGUoYXRpbWUpLCBuZXcgRGF0ZShtdGltZSksIG5ldyBEYXRlKGN0aW1lKSk7XG4gIH1cblxuICAvKipcbiAgICogKipOb25zdGFuZGFyZCoqOiBDbG9uZSB0aGUgc3RhdHMgb2JqZWN0LlxuICAgKiBAcmV0dXJuIFtCcm93c2VyRlMubm9kZS5mcy5TdGF0c11cbiAgICovXG4gIHB1YmxpYyBjbG9uZSgpOiBTdGF0cyB7XG4gICAgcmV0dXJuIG5ldyBTdGF0cyh0aGlzLm1vZGUgJiAweEYwMDAsIHRoaXMuc2l6ZSwgdGhpcy5tb2RlICYgMHhGRkYsIHRoaXMuYXRpbWUsIHRoaXMubXRpbWUsIHRoaXMuY3RpbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4gW0Jvb2xlYW5dIFRydWUgaWYgdGhpcyBpdGVtIGlzIGEgZmlsZS5cbiAgICovXG4gIHB1YmxpYyBpc0ZpbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICh0aGlzLm1vZGUgJiAweEYwMDApID09PSBGaWxlVHlwZS5GSUxFO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4gW0Jvb2xlYW5dIFRydWUgaWYgdGhpcyBpdGVtIGlzIGEgZGlyZWN0b3J5LlxuICAgKi9cbiAgcHVibGljIGlzRGlyZWN0b3J5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAodGhpcy5tb2RlICYgMHhGMDAwKSA9PT0gRmlsZVR5cGUuRElSRUNUT1JZO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4gW0Jvb2xlYW5dIFRydWUgaWYgdGhpcyBpdGVtIGlzIGEgc3ltYm9saWMgbGluayAob25seSB2YWxpZCB0aHJvdWdoIGxzdGF0KVxuICAgKi9cbiAgcHVibGljIGlzU3ltYm9saWNMaW5rKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAodGhpcy5tb2RlICYgMHhGMDAwKSA9PT0gRmlsZVR5cGUuU1lNTElOSztcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFuZ2UgdGhlIG1vZGUgb2YgdGhlIGZpbGUuIFdlIHVzZSB0aGlzIGhlbHBlciBmdW5jdGlvbiB0byBwcmV2ZW50IG1lc3NpbmdcbiAgICogdXAgdGhlIHR5cGUgb2YgdGhlIGZpbGUsIHdoaWNoIGlzIGVuY29kZWQgaW4gbW9kZS5cbiAgICovXG4gIHB1YmxpYyBjaG1vZChtb2RlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLm1vZGUgPSAodGhpcy5tb2RlICYgMHhGMDAwKSB8IG1vZGU7XG4gIH1cblxuICAvLyBXZSBkb24ndCBzdXBwb3J0IHRoZSBmb2xsb3dpbmcgdHlwZXMgb2YgZmlsZXMuXG5cbiAgcHVibGljIGlzU29ja2V0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBpc0Jsb2NrRGV2aWNlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBpc0NoYXJhY3RlckRldmljZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgaXNGSUZPKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19
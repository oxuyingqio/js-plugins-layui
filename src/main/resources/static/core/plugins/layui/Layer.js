/**
 * @name Layer
 * @package core.plugins.layui
 * @desc 弹出层
 * @type 对象
 * 
 * @date 2019年7月31日 16:29:55
 */
core.plugins.layui.Layer = (function() {

	// 6：笑脸；5：哭脸；4：锁；3：问好；2：红叉；1：对勾；0：感叹号

	/**
	 * 自身
	 */
	var layer;

	/**
	 * LAYUI 通知
	 */
	var LayuiNotice;

	// 调用LAYUI Notice模块
	layui.use([ "notice" ], function() {

		// 获取LAYUI Notice实例
		LayuiNotice = layui.notice;
	});

	/**
	 * 构造函数
	 */
	var Constructor = function() {

	};

	/**
	 * 弹出信息
	 * 
	 * @param content
	 * @param callback
	 */
	Constructor.prototype.alertMessage = function(content, callback) {

		layer.alert(content, {
			icon : 0
		}, callback);
	};

	/**
	 * 弹出错误
	 * 
	 * @param content
	 * @param callback
	 */
	Constructor.prototype.alertError = function(content, callback) {

		layer.alert(content, {
			icon : 2,
			title : "错误"
		}, callback);
	};

	/**
	 * 提示信息
	 * 
	 * @param content
	 */
	Constructor.prototype.showMessage = function(content) {

		LayuiNotice.msg(content, {
			icon : 5
		});
	};

	/**
	 * 提示成功
	 */
	Constructor.prototype.showSuccess = function() {

		LayuiNotice.msg("操作成功", {
			icon : 1
		});
	};

	/**
	 * 提示失败
	 */
	Constructor.prototype.showFailure = function() {

		LayuiNotice.msg("操作失败", {
			icon : 2
		});
	};

	return {

		/**
		 * 获取LAYER
		 * 
		 * @returns
		 */
		getInstance : function() {

			// 不存在,则创建
			if (!layer) {

				layer = new Constructor();
			}

			return layer;
		}
	};
})();
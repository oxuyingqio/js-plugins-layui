/**
 * @name Layer
 * @package core.plugins.layui
 * @desc 弹出层
 * @type 对象
 * 
 * @date 2019年7月31日 16:29:55
 */
core.plugins.layui.Layer = {

	/**
	 * 弹出信息
	 * 
	 * @param content
	 * @param callback
	 */
	alertMessage : function(content, callback) {

		layer.alert(content, {
			icon : 0
		}, callback);
	},

	/**
	 * 弹出错误
	 * 
	 * @param content
	 * @param callback
	 */
	alertError : function(content, callback) {

		layer.alert(content, {
			icon : 2,
			title : "错误"
		}, callback);
	},

	/**
	 * 提示信息
	 * 
	 * @param content
	 */
	showMessage : function(content) {

		// 调用LAYUI Notice模块
		layui.use([ "notice" ], function() {

			layui.notice.msg(content, {
				icon : 5
			});
		});
	},

	/**
	 * 提示成功
	 */
	showSuccess : function() {

		// 调用LAYUI Notice模块
		layui.use([ "notice" ], function() {

			layui.notice.msg("操作成功", {
				icon : 1
			});
		});
	},

	/**
	 * 提示失败
	 */
	showFailure : function() {

		// 调用LAYUI Notice模块
		layui.use([ "notice" ], function() {

			layui.notice.msg("操作失败", {
				icon : 2
			});
		});
	}
};
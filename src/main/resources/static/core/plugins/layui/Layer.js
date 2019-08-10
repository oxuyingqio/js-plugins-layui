/**
 * @name Layer
 * @package core.plugins.layui
 * @desc 弹出层
 * @type 对象
 * 
 * @date 2019年7月31日 16:29:55
 */
core.plugins.layui.Layer = {

	// 6：笑脸；5：哭脸；4：锁；3：问好；2：红叉；1：对勾；0：感叹号

	/**
	 * 弹出信息
	 * 
	 * @param content
	 * @param param
	 */
	alertMessage : function(content, param) {

		layui.use("layer", function() {

			switch (typeof (param)) {
			case "undefined":
				layui.layer.alert(content, {
					icon : 0
				});
				break;
			case "function":
				layui.layer.alert(content, {
					icon : 0
				}, param);
				break;
			case "object":
				layui.layer.alert(content, param);
				break;
			}
		});
	},

	/**
	 * 弹出错误
	 * 
	 * @param content
	 * @param param
	 */
	alertError : function(content, param) {

		layui.use("layer", function() {

			switch (typeof (param)) {
			case "undefined":
				layui.layer.alert(content, {
					icon : 2,
					title : "错误"
				});
				break;
			case "function":
				layui.layer.alert(content, {
					icon : 2,
					title : "错误"
				}, param);
				break;
			case "object":
				layui.layer.alert(content, param);
				break;
			}
		});
	},

	/**
	 * 提示信息
	 * 
	 * @param content
	 * @param param
	 */
	showMessage : function(content, param) {

		// 调用LAYUI Notice模块
		layui.use("notice", function() {

			layui.notice.msg(content, {
				icon : 5
			});

			switch (typeof (param)) {
			case "undefined":
				layui.notice.msg(content, {
					icon : 5
				});
				break;
			case "object":
				layui.notice.msg(content, param);
				break;
			}
		});
	},

	/**
	 * 提示成功
	 */
	showSuccess : function() {

		// 调用LAYUI Notice模块
		layui.use("notice", function() {

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
		layui.use("notice", function() {

			layui.notice.msg("操作失败", {
				icon : 2
			});
		});
	}
};
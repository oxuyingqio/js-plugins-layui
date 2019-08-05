/**
 * 包
 */

// LAYUI插件包
core.plugins.layui = {

};
/**
 * LAYUI扩展
 */
layui.config({
	base : "../../resources/layui-extend/"
}).extend({
	// 通知
	notice : "notice/notice",
	// 树表格
	treetable : "treetable-lay/treetable"
});
/**
 * @name Form
 * @package core.plugins.layui
 * @desc 表单
 * @type 类
 * 
 * @date 2019年7月12日 11:27:29
 */
core.plugins.layui.Form = (function() {

	/**
	 * LAYUI Form实例
	 */
	var LayuiForm;

	// 调用LAYUI,form模块
	layui.use([ "form" ], function() {

		// 获取LAYUI Form实例
		LayuiForm = layui.form;
	});

	/**
	 * 构造函数
	 */
	var Constructor = function() {

		/**
		 * ------------------------------自身属性------------------------------
		 */
		/**
		 * ID
		 */
		var id = arguments[0];
		/**
		 * 过滤器
		 */
		var filter = arguments.length > 1 ? arguments[1] : arguments[0];
		/**
		 * 数据
		 */
		var data;
		/**
		 * 按钮
		 */
		var button;
		/**
		 * 弹出层索引
		 */
		var index;

		/**
		 * ----------------------LAYUI弹出层属性----------------------
		 */
		/**
		 * 标题
		 */
		var title;
		/**
		 * 宽度
		 */
		var width;
		/**
		 * 高度
		 */
		var height;

		/**
		 * -------------------------方法----------------------------
		 */
		/**
		 * 获取jQuery对象
		 * 
		 * @returns {object}
		 */
		this.$jQuery = function() {

			return $("#" + this.id());
		};

		/**
		 * 获取/设置 id
		 * 
		 * @param id
		 * @returns
		 */
		this.id = function() {

			switch (arguments.length) {
			case 0:
				return id;
			default:
				id = arguments[0];
				return this;
			}
		};

		/**
		 * 获取/设置 filter
		 * 
		 * @param filter
		 * @returns
		 */
		this.filter = function() {

			switch (arguments.length) {
			case 0:
				return filter;
			default:
				filter = arguments[0];
				return this;
			}
		};

		/**
		 * 获取/设置 data
		 * 
		 * @param data
		 * @returns
		 */
		this.data = function() {

			switch (arguments.length) {
			case 0:
				return data;
			default:
				data = arguments[0];
				return this;
			}
		};

		/**
		 * 获取/设置 button
		 * 
		 * @param button
		 * @returns
		 */
		this.button = function() {

			switch (arguments.length) {
			case 0:
				return button;
			default:
				button = arguments[0];
				return this;
			}
		};

		/**
		 * 获取/设置 index
		 * 
		 * @param index
		 * @returns
		 */
		this.index = function() {

			switch (arguments.length) {
			case 0:
				return index;
			default:
				index = arguments[0];
				return this;
			}
		};

		/**
		 * 获取/设置 title
		 * 
		 * @param title
		 * @returns
		 */
		this.title = function() {

			switch (arguments.length) {
			case 0:
				return title;
			default:
				title = arguments[0];
				return this;
			}
		};

		/**
		 * 获取/设置 width
		 * 
		 * @param width
		 * @returns
		 */
		this.width = function() {

			switch (arguments.length) {
			case 0:
				return width;
			default:
				width = arguments[0];
				return this;
			}
		};

		/**
		 * 获取/设置 height
		 * 
		 * @param height
		 * @returns
		 */
		this.height = function() {

			switch (arguments.length) {
			case 0:
				return height;
			default:
				height = arguments[0];
				return this;
			}
		};
	};

	/**
	 * 初始化
	 * 
	 * @returns
	 */
	Constructor.prototype.init = function() {

		// 备份this对象
		var _this = this;

		// 实例化HTML
		var html = [];
		// 添加内容
		html.push("<form ");
		html.push("id='" + this.id() + "' ");
		html.push("class='layui-form layui-form-pane' ");
		html.push("style='margin:15px 75px 0px 75px;' ");
		html.push("lay-filter='" + this.filter() + "' ");
		html.push(">");

		// 获取数据
		var data = this.data();
		// 遍历数据
		for (var i = 0, length = data.length; i < length; i++) {

			// 添加内容
			html.push("<div class='layui-form-item'>");

			// 获取行数据
			var row = data[i];
			// 遍历行数据
			for (var j = 0, jLength = row.length; j < jLength; j++) {

				// 获取列数据
				var column = row[j];
				// 判断列数据类型
				if (typeof (column) === "object") {

					// 是否存在label
					if (column.label) {

						// 判断label类型
						if (typeof (column.label) === "string") {

							// 添加元素
							html.push("<label class='layui-form-label'>");
							html.push(column.label);
							html.push("</label>");
						}
					}

					// 添加内容
					html.push("<div class='" + (jLength === 1 ? "layui-input-block" : "layui-input-inline") + "' style='"
							+ (column.layui && column.layui.style ? column.layui.style : "") + "'>");

					// 是否存在HTML
					if (column.html) {

						// 添加内容
						html.push(column.html);
					}

					// 是否存在input
					if (column.input) {

						// 添加内容
						html.push("<input ");
						html.push("id='" + column.input.name + "' ");
						html.push("name='" + column.input.name + "' ");
						html.push("type='" + (column.input.type ? column.input.type : "text") + "' ");
						html.push("class='layui-input' ");
						html.push(column.input.checked ? ("checked='" + column.input.checked + "' ") : "");
						html.push(column.input.verify ? ("lay-verify='" + column.input.verify + "' ") : "");
						html.push(column.input.reqtext ? ("lay-reqtext='" + column.input.reqtext + "' ") : "");
						html.push(column.input.skin ? ("lay-skin='" + column.input.skin + "' ") : "");
						html.push(column.input.filter ? ("lay-filter='" + column.input.filter + "' ") : "");
						html.push(column.input.text ? ("lay-text='" + column.input.text + "' ") : "");
						html.push(column.input.placeholder ? ("placeholder='" + column.input.placeholder + "' ") : "");
						html.push("autocomplete='off' ");
						html.push(">");
					}

					// 添加内容
					html.push("</div>");
				} else {

					// 非object对象,则直接添加
					html.push(column);
				}
			}

			// 添加内容
			html.push("</div>");
		}

		// 添加内容
		html.push("</form>");

		// 实例化按钮
		var btn = [];
		// 实例化按钮函数
		var btnFunction = {};
		// 获取按钮
		var button = this.button();
		// 遍历按钮
		for (var i = 0, length = button.length; i < length; i++) {

			// 添加按钮
			btn.push(button[i].text);
			// 设置按钮函数.使用函数寄存器调用,处理循环引用异常问题
			btnFunction[i === 0 ? "yes" : "btn" + (i + 1)] = new FunctionRegister(button[i].handler).cal;
		}

		// 打开弹出层,并记录索引
		this.index(layer.open($.extend({
			type : 1,
			title : _this.title(),
			content : html.join(""),
			area : [ _this.width(), _this.height() ],
			btn : btn,
			id : "corePluginsLayuiForm" + _this.id()
		}, btnFunction)));

		// 渲染表单
		LayuiForm.render();

		// 返回自身
		return this;
	};

	/**
	 * 函数寄存器
	 */
	var FunctionRegister = function(fun) {

		/**
		 * 函数
		 */
		var fun = fun;

		/**
		 * 执行函数
		 * 
		 * @param index
		 * @param layero
		 * @returns
		 */
		this.cal = function(index, layero) {

			// 调用函数
			fun(index, layero);

			// 返回false
			return false;
		}
	};

	/**
	 * 加载数据
	 * 
	 * @param data
	 */
	Constructor.prototype.load = function(data) {

		// 加载数据
		LayuiForm.val(this.filter(), data);
	};

	/**
	 * 重置表单
	 */
	Constructor.prototype.reset = function() {

		this.$jQuery().resetForm();
	};

	/**
	 * 提交表单
	 */
	Constructor.prototype.submit = function(options) {

		this.$jQuery().ajaxSubmit(options);
	};

	/**
	 * 关闭窗口
	 * 
	 * @returns
	 */
	Constructor.prototype.close = function() {

		layer.close(this.index());
	};

	// 返回构造
	return Constructor;
})();
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
/**
 * @name Table
 * @package core.plugins.layui
 * @desc 表格
 * @type 类
 * 
 * @date 2019年7月12日 11:15:15
 */
core.plugins.layui.Table = (function() {

	/**
	 * LAYUI Table实例
	 */
	var LayuiTable;

	// 调用LAYUI,table模块
	layui.use([ "table" ], function() {

		// 获取LAYUI table实例
		LayuiTable = layui.table;
	});

	/**
	 * 构造函数
	 */
	var Constructor = function() {

		// 判断参数个数
		if (arguments.length !== 2) {

			new core.lang.Exception(arguments, "core.plugins.layui.Table", "构造参数异常", "参数个数必须为2个,实际得到" + arguments.length + "个.");
		}

		/**
		 * ----------------------------------自身属性------------------------
		 */
		/**
		 * jQuery对象
		 */
		var $jQuery = $(arguments[0]);
		/**
		 * 过滤器
		 */
		var filter = arguments[1];
		/**
		 * LAYUI对象
		 */
		var layui;

		/**
		 * -------------------------------LAYUI属性-----------------------------------
		 */
		/**
		 * 指定原始 table 容器的选择器或 DOM，方法渲染方式必填
		 */
		var elem = arguments[0];
		/**
		 * 设置表头。值是一个二维数组。方法渲染方式必填
		 */
		var cols;
		/**
		 * 异步数据接口相关参数。其中 url 参数为必填项
		 */
		var url;
		/**
		 * 开启表格头部工具栏区域
		 */
		var toolbar;
		/**
		 * 自由配置头部工具栏右侧的图标
		 */
		var defaultToolbar = [];
		/**
		 * 宽度
		 */
		var width;
		/**
		 * 高度
		 */
		var height;
		/**
		 * 开启分页
		 */
		var page = true;
		/**
		 * 默认 true，即直接由 table 组件在前端自动处理排序。 若为 false，则需自主排序，通常由服务端直接返回排序好的数据。
		 */
		var autoSort = false;
		/**
		 * 初始排序状态。用于在数据表格渲染完毕时，默认按某个字段排序。
		 */
		var initSort;

		/**
		 * -----------------------------------LAYUI事件---------------------------------------------
		 */
		/**
		 * 行单击事件
		 */
		var row;

		/**
		 * -----------------------------------方法----------------------------------------
		 */
		/**
		 * 获取jQuery对象
		 * 
		 * @returns {object}
		 */
		this.$jQuery = function() {

			return $jQuery;
		};

		/**
		 * 获取/设置 filter
		 * 
		 * @param filter
		 * @returns
		 */
		this.filter = function() {

			switch (arguments.length) {
			case 0:
				return filter;
			default:
				filter = arguments[0];
				return this;
			}
		};

		/**
		 * 获取/设置 LAYUI
		 * 
		 * @param layui
		 * @returns
		 */
		this.layui = function() {

			switch (arguments.length) {
			case 0:
				return layui;
			default:
				layui = arguments[0];
				return this;
			}
		};

		/**
		 * 获取/设置 elem
		 * 
		 * @param elem
		 * @returns
		 */
		this.elem = function() {

			switch (arguments.length) {
			case 0:
				return elem;
			default:
				elem = arguments[0];
				return this;
			}
		};

		/**
		 * 获取/设置 cols
		 * 
		 * @param cols
		 * @returns
		 */
		this.cols = function() {

			switch (arguments.length) {
			case 0:
				return cols;
			default:
				cols = arguments[0];
				return this;
			}
		};

		/**
		 * 获取/设置 url
		 * 
		 * @param url
		 * @returns
		 */
		this.url = function() {

			switch (arguments.length) {
			case 0:
				return url;
			default:
				url = arguments[0];
				return this;
			}
		};

		/**
		 * 获取/设置 toolbar
		 * 
		 * @param toolbar
		 * @returns
		 */
		this.toolbar = function() {

			switch (arguments.length) {
			case 0:
				return toolbar;
			default:
				toolbar = arguments[0];
				return this;
			}
		};

		/**
		 * 获取/设置 defaultToolbar
		 * 
		 * @param defaultToolbar
		 * @returns
		 */
		this.defaultToolbar = function() {

			switch (arguments.length) {
			case 0:
				return defaultToolbar;
			default:
				defaultToolbar = arguments[0];
				return this;
			}
		};

		/**
		 * 获取/设置 width
		 * 
		 * @param width
		 * @returns
		 */
		this.width = function() {

			switch (arguments.length) {
			case 0:
				return width;
			default:
				width = arguments[0];
				return this;
			}
		};

		/**
		 * 获取/设置 height
		 * 
		 * @param height
		 * @returns
		 */
		this.height = function() {

			switch (arguments.length) {
			case 0:
				return height;
			default:
				height = arguments[0];
				return this;
			}
		};

		/**
		 * 获取/设置 page
		 * 
		 * @param page
		 * @returns
		 */
		this.page = function() {

			switch (arguments.length) {
			case 0:
				return page;
			default:
				page = arguments[0];
				return this;
			}
		};

		/**
		 * 获取/设置 autoSort
		 * 
		 * @param autoSort
		 * @returns
		 */
		this.autoSort = function() {

			switch (arguments.length) {
			case 0:
				return autoSort;
			default:
				autoSort = arguments[0];
				return this;
			}
		};

		/**
		 * 获取/设置 initSort
		 * 
		 * @param initSort
		 * @returns
		 */
		this.initSort = function() {

			switch (arguments.length) {
			case 0:
				return initSort;
			default:
				initSort = arguments[0];
				return this;
			}
		};

		/**
		 * 获取/设置行单击事件
		 * 
		 * @param row
		 * @returns
		 */
		this.row = function() {

			switch (arguments.length) {
			case 0:
				return row;
			default:
				row = arguments[0];
				return this;
			}
		};
	};

	/**
	 * 初始化
	 * 
	 * @returns
	 */
	Constructor.prototype.init = function() {

		// 校验Document是否存在
		if (this.$jQuery().length === 0) {

			new core.lang.Exception(this.$jQuery(), "core.plugins.layui.Table", "构造参数异常", "Document不存在.");
		}

		// 备份this对象
		var _this = this;

		// 声明toolbar
		var toolbar;
		// 获取设置的toolbar
		var setToolbar = this.toolbar();
		// 判断设置的toolbar类型
		if (typeof (setToolbar) === "object") {

			// 实例化HTML
			var html = [];
			// 添加内容
			html.push("<div class='layui-btn-container'>");
			// 遍历设置的toolbar
			for (var i = 0, length = setToolbar.length; i < length; i++) {

				// 获取配置信息
				var config = setToolbar[i];

				// 添加内容
				html.push("<button ");
				html.push("class='" + (config.iconCls ? config.iconCls : "layui-btn layui-btn-sm") + "' ");
				html.push("lay-event='" + config.event + "' ");
				html.push(">");
				html.push(config.text);
				html.push("</button>");
			}
			// 添加内容
			html.push("</div>");

			// 赋值
			toolbar = html.join("");
		} else {

			// 赋值
			toolbar = setToolbar;
		}

		// 初始化表格,并记录返回的LAYUI实例
		this.layui(LayuiTable.render({
			elem : _this.elem(),
			cols : _this.cols(),
			url : _this.url(),
			toolbar : toolbar,
			defaultToolbar : _this.defaultToolbar(),
			width : _this.width(),
			height : _this.height(),
			page : _this.page(),
			autoSort : _this.autoSort(),
			initSort : _this.initSort()
		}));

		// 判断设置的toolbar类型
		if (typeof (setToolbar) === "object") {

			// 监听toolbar事件
			LayuiTable.on("toolbar(" + this.filter() + ")", function(obj) {

				// 遍历设置的toolbar
				for (var i = 0, length = setToolbar.length; i < length; i++) {

					// 获取配置信息
					var config = setToolbar[i];

					// 判断事件是否一致
					if (obj.event === config.event) {

						// 存在处理函数,则调用
						typeof (config.handler) === "function" && config.handler(obj);
					}
				}
			});
		}

		// 监听行单击事件
		table.on("row(" + this.filter() + ")", function(obj) {

			// 存在行单击事件,则调用
			typeof (_this.row()) === "function" && _this.row()(obj);
		});

		// 返回自身
		return this;
	};

	// 返回构造函数
	return Constructor;
})();

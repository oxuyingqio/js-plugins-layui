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
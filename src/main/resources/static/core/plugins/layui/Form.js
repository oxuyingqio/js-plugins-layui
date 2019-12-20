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
		 * 父ID
		 */
		var pid;
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
		 * 实现类型
		 */
		var impl;

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
		 * 获取/设置 pid
		 * 
		 * @param pid
		 * @returns
		 */
		this.pid = function() {

			switch (arguments.length) {
			case 0:
				return pid;
			default:
				pid = arguments[0];
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
		 * 获取/设置 impl
		 * 
		 * @param impl
		 * @returns
		 */
		this.impl = function() {

			switch (arguments.length) {
			case 0:
				return impl;
			default:
				impl = arguments[0];
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
		html.push("style='");
		// 判断实现方式
		if (this.impl() === "HTML") {

			html.push(this.width() ? "width:" + this.width() + "; " : "");
			html.push(this.height() ? "height:" + this.height() + "; " : "");
		}
		html.push("margin:15px 75px 0px 75px; ");
		html.push("' ");
		html.push("method='post' ");
		html.push("enctype='multipart/form-data' ");
		html.push("lay-filter='" + this.filter() + "' ");
		html.push(">");

		// 获取数据
		var data = this.data();
		// 遍历数据
		for (var i = 0; i < data.length; i++) {

			// 添加内容
			html.push("<div class='layui-form-item'>");

			// 获取行数据
			var row = data[i];
			// 遍历行数据
			for (var j = 0; j < row.length; j++) {

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
						} else if (typeof (column.label) === "object") {

							// 添加元素
							html.push("<label class='layui-form-label'>");
							html.push(column.label.required ? "<font style='color:red;position:relative;top:2px;'>*</font>&nbsp;" : "");
							html.push(column.label.text);
							html.push("</label>");
						}
					}

					// 添加内容
					html.push("<div class='layui-input-" + (j == row.length - 1 ? "block" : "inline") + "' style='"
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
						html.push(column.input.value ? ("value='" + column.input.value + "' ") : "");
						html.push(column.input.readOnly ? "readOnly " : "");
						html.push(column.input.checked ? ("checked='" + column.input.checked + "' ") : "");
						html.push(column.input.accept ? ("accept='" + column.input.accept + "' ") : "");
						html.push("class='layui-input' ");
						html.push(column.input.layVerify ? ("lay-verify='" + column.input.layVerify + "' ") : "");
						html.push(column.input.layReqtext ? ("lay-reqtext='" + column.input.layReqtext + "' ") : "");
						html.push(column.input.laySkin ? ("lay-skin='" + column.input.laySkin + "' ") : "");
						html.push(column.input.layFilter ? ("lay-filter='" + column.input.layFilter + "' ") : "");
						html.push(column.input.layText ? ("lay-text='" + column.input.layText + "' ") : "");
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

		// 获取按钮
		var button = this.button();
		// 判断实现方式
		if (this.impl() === "HTML") {

			// 添加内容
			html.push(" <div style='text-align:right'>")
			// 遍历按钮
			for (var i = 0; i < button.length; i++) {

				// 添加内容
				html.push("<a ")
				html.push("id='" + this.id() + "button" + i + "' ")
				html.push("class='layui-btn ");
				html.push(i === 0 ? "layui-btn-normal" : "layui-btn-primary");
				html.push("'>");
				html.push(button[i].text);
				html.push("</a>");
			}
			// 添加内容
			html.push("</div>");

			// 添加内容
			$("#" + this.pid()).html(html.join(""));

			// 遍历按钮
			for (var i = 0; i < button.length; i++) {

				// 设置事件
				$("#" + this.id() + "button" + i).click(button[i].handler);
			}
		} else {

			// 实例化按钮
			var btn = [];
			// 实例化按钮函数
			var btnFunction = {};
			// 遍历按钮
			for (var i = 0; i < button.length; i++) {

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
		}

		// 调用LAYUI,form模块
		layui.use([ "form" ], function() {

			// 获取LAYUI Form实例
			layui.form.render();
		});

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

		// 备份this
		var _this = this;

		// 调用LAYUI,form模块
		layui.use([ "form" ], function() {

			// 获取LAYUI Form实例
			layui.form.val(_this.filter(), data);
		});
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
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
		 * 接口http请求类型，默认：get
		 */
		var method = "post";
		/**
		 * 接口的其它参数。如：where: {token: 'sasasas', id: 123}
		 */
		var where = {};
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
		 * 行双击事件
		 */
		var rowDouble;

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
		 * 获取/设置 method
		 * 
		 * @param method
		 * @returns
		 */
		this.method = function() {

			switch (arguments.length) {
			case 0:
				return method;
			default:
				method = arguments[0];
				return this;
			}
		};

		/**
		 * 获取/设置 where
		 * 
		 * @param where
		 * @returns
		 */
		this.where = function() {

			switch (arguments.length) {
			case 0:
				return where;
			default:
				where = arguments[0];
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

		/**
		 * 获取/设置行双击事件
		 * 
		 * @param row
		 * @returns
		 */
		this.rowDouble = function() {

			switch (arguments.length) {
			case 0:
				return rowDouble;
			default:
				rowDouble = arguments[0];
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
			for (var i = 0; i < setToolbar.length; i++) {

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

		// 调用LAYUI,table模块
		layui.use([ "table" ], function() {

			// 获取LAYUI table实例
			var table = layui.table;

			// 获取cookie
			var cookie = core.html.utils.Cookie.getInstance();

			// 初始化表格,并记录返回的LAYUI实例
			_this.layui(table.render({
				elem : _this.elem(),
				cols : _this.cols(),
				url : _this.url(),
				method : _this.method(),
				where : _this.where(),
				toolbar : toolbar,
				defaultToolbar : _this.defaultToolbar(),
				width : _this.width(),
				height : _this.height(),
				done : function(res, curr, count) {

					// 设置Cookie
					cookie.set("COOKIE_CORE_PLUGINS_LAYUI_TABLE_" + _this.elem(), _this.layui().config.page.limit, 3650);
				},
				page : _this.page(),
				limit : cookie.get("COOKIE_CORE_PLUGINS_LAYUI_TABLE_" + _this.elem()) ? cookie.get("COOKIE_CORE_PLUGINS_LAYUI_TABLE_" + _this.elem()) : 10,
				autoSort : _this.autoSort(),
				initSort : _this.initSort()
			}));

			// 判断设置的toolbar类型
			if (typeof (setToolbar) === "object") {

				// 监听toolbar事件
				table.on("toolbar(" + _this.filter() + ")", function(obj) {

					// 遍历设置的toolbar
					for (var i = 0; i < setToolbar.length; i++) {

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
			table.on("row(" + _this.filter() + ")", function(obj) {

				// 存在行单击事件,则调用
				typeof (_this.row()) === "function" && _this.row()(obj);
			});

			// 监听行双击事件
			table.on("rowDouble(" + _this.filter() + ")", function(obj) {

				// 存在行双击事件,则调用
				typeof (_this.rowDouble()) === "function" && _this.rowDouble()(obj);
			});
		});

		// 返回自身
		return this;
	};

	// 返回构造函数
	return Constructor;
})();
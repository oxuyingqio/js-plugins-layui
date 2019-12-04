/**
 * @name Search
 * @package core.plugins.layui
 * @desc 搜索
 * @type 类
 * 
 * @date 2019年8月12日 18:59:33
 */
core.plugins.layui.Search = (function() {

	/**
	 * 构造函数
	 */
	var Constructor = function() {

		/**
		 * ------------------------------属性------------------------------
		 */
		/**
		 * ID
		 */
		var id = arguments[0];
		/**
		 * 数据
		 */
		var data;

		/**
		 * ------------------------------事件-------------------------------
		 */
		/**
		 * 搜索事件
		 */
		var search;

		/**
		 * -----------------------------方法----------------------------
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
		 * 获取/设置 search
		 * 
		 * @param search
		 * @returns
		 */
		this.search = function() {

			switch (arguments.length) {
			case 0:
				return search;
			default:
				search = arguments[0];
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

		// 添加LAYUI FORM样式
		this.$jQuery().addClass("layui-form");

		// 实例化HTML
		var html = [];
		// 遍历数据
		for (var i = 0; i < this.data().length; i++) {

			// 添加内容
			html.push("<div class='layui-form-item' style='margin-bottom:0px;'>");

			// 获取行数据
			var data = this.data()[i];
			// 遍历行数据
			for (var j = 0; j < data.length; j++) {

				// 获取配置项
				var config = data[j];
				// 判断类型
				if (typeof (config) === "object") {

					// 是否存在label
					if (config.label) {

						// 判断label类型
						if (typeof (config.label) === "string") {

							// 添加内容
							html.push("<label class='layui-search-label' style='white-space:nowrap'>");
							html.push(config.label);
							html.push("</label>");
						}
					}

					// 添加内容
					html.push("<div class='layui-input-inline' style='margin:0px; " + (config.layui && config.layui.style ? config.layui.style : "") + "'>");

					// 是否存在HTML
					if (config.html) {

						// 添加内容
						html.push(config.html);
					}

					// 是否存在input
					if (config.input) {

						// 添加内容
						html.push("<input ");
						html.push("id='" + config.input.name + "' ");
						html.push("name='" + config.input.name + "' ");
						html.push("type='" + (config.input.type ? config.input.type : "text") + "' ");
						html.push("value='" + (config.input.value ? config.input.value : "") + "' ");
						html.push("field='" + config.input.field + "' ");
						html.push("queryMode='" + config.input.queryMode + "' ");
						html.push("class='layui-input' ");
						html.push(config.input.checked ? ("checked='" + config.input.checked + "' ") : "");
						html.push(config.input.verify ? ("lay-verify='" + config.input.verify + "' ") : "");
						html.push(config.input.reqtext ? ("lay-reqtext='" + config.input.reqtext + "' ") : "");
						html.push(config.input.skin ? ("lay-skin='" + config.input.skin + "' ") : "");
						html.push(config.input.filter ? ("lay-filter='" + config.input.filter + "' ") : "");
						html.push(config.input.text ? ("lay-text='" + config.input.text + "' ") : "");
						html.push(config.input.placeholder ? ("placeholder='" + config.input.placeholder + "' ") : "");
						html.push("autocomplete='off' ");
						html.push(">");
					}

					// 添加内容
					html.push("</div>");
				} else if (typeof (config) === "string") {

					// 添加内容
					html.push(config);
				}

			}

			// 第一行增加按钮
			if (i === 0) {

				// 添加内容
				html.push("<div class='layui-inline' style='margin:0px;margin-left:10px;'>");
				html.push("	<button id='" + this.id() + "Search' class='layui-btn icon-btn'>");
				html.push("		<i class='layui-icon'></i>搜索");
				html.push("	</button>");
				html.push("	<button id='" + this.id() + "Reset' class='layui-btn icon-btn layui-btn-primary' style='margin:0px;margin-left:3px;'>");
				html.push("		<i class='layui-icon'></i>重置");
				html.push("	</button>");
				html.push("</div>");
			}

			// 添加内容
			html.push("</div>");
		}

		// 添加内容
		this.$jQuery().html(html.join(""));

		// 调用LAYUI,FORM
		layui.use([ "form" ], function() {

			// 渲染
			layui.form.render();
		});

		// 备份this
		var _this = this;
		// 搜索按钮
		$("#" + this.id() + "Search").click(this.search());
		// 重置按钮
		$("#" + this.id() + "Reset").click(function() {

			// 获取搜索内所有包含name属性,并遍历
			_this.$jQuery().find("[name]").each(function() {

				// 清空内容
				$(this).val("");
			});

			// 获取搜索内所有input,并遍历
			_this.$jQuery().find("input").each(function() {

				// 清空内容
				$(this).val("");
			});
		});

		// 返回
		return this;
	};

	/**
	 * 获取搜索JSON数据
	 */
	Constructor.prototype.getJson = function() {

		// 实例化搜索数据
		var data = [];

		// 获取搜索内所有包含name属性,并遍历
		this.$jQuery().find("[name]").each(function() {

			// 判断内容是否为空
			if ($(this).val() !== "") {

				// 实例化标识
				var flag = true;
				// 遍历已添加的数据
				for (var i = 0; i < data.length; i++) {

					// 判断搜索字段是否一致
					if (data[i].field === $(this).attr("field")) {

						// 添加内容
						data[i].values.push($(this).val());
						// 修改标识
						flag = false;
					}
				}

				// 判断标识
				if (flag) {

					// 添加内容
					data.push({
						field : $(this).attr("field"),
						queryMode : $(this).attr("queryMode"),
						values : [ $(this).val() ]
					})
				}
			}
		});

		// 返回数据
		return data;
	};

	// 返回构造
	return Constructor;
})();
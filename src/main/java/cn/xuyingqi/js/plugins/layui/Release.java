package cn.xuyingqi.js.plugins.layui;

import java.io.File;

import cn.xuyingqi.utils.FileUtils;
import cn.xuyingqi.utils.tool.operate.file.impl.CopyFileContent2SpecifiedFile;
import cn.xuyingqi.utils.tool.operate.file.impl.HandleSpecifyFormatFile;

/**
 * 生成发布文件
 * 
 * @author XuYQ
 *
 */
public class Release {

	/**
	 * 生成JS发布文件
	 */
	public static void releaseJs() {

		// 项目路径
		String projectPath = System.getProperty("user.dir");
		// JavaScript核心包公共路径
		String jsCommonPath = "/src/main/resources/static/core/";
		// JavaScript核心包路径集合
		String[] packagePaths = { "package.js", "plugins/layui" };

		// 操作的文件类型
		String fileType = ".js";
		// 生成文件的位置
		File coreFile = new File("D:/Users/XuYQ/Desktop/layui.js");
		// File coreFile = new File("D:/用户目录/我的桌面/core.js");

		// 若生成文件存在,则先删除
		if (coreFile.exists()) {

			coreFile.delete();
		}

		// 循环遍历路径集合
		for (int i = 0, length = packagePaths.length; i < length; i++) {

			System.out.println("进度:" + (i + 1) + "/" + length);

			FileUtils.recursionFile(new File(projectPath + jsCommonPath + packagePaths[i]),
					new HandleSpecifyFormatFile(fileType, new CopyFileContent2SpecifiedFile(coreFile)));
		}

		System.out.println("操作结束");
	}

	public static void main(String[] args) {

		Release.releaseJs();
	}
}
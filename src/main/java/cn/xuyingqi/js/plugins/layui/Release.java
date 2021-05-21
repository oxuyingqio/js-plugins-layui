package cn.xuyingqi.js.plugins.layui;

/**
 * 发布程序
 *
 * @author XuYQ
 */
public final class Release {

    /**
     * Main函数测试
     *
     * @param args
     */
    public static void main(String[] args) {

        // layui.js
        cn.xuyingqi.js.Release.releaseJs(new String[]{"package.js", "plugins/layui"}, "D:/Users/XuYQ/Desktop/layui.js");
    }
}
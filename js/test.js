/*!
 * 静态调试区域
 * project:
 * - https://github.com/Alice-Jie/AudioVisualizer
 * - https://gitee.com/Alice_Jie/circleaudiovisualizer
 * - http://steamcommunity.com/sharedfiles/filedetails/?id=921617616
 * @license MIT licensed
 * @author Alice
 * @date 2017/07/28
 */

(function ($, window, document, Math) {

    'use strict';

    // 定义变量
    //--------------------------------------------------------------------------------------------------------------

    // 模拟音频数据
    let audioSamples = new Array(128);
    for (let i = 0; i < 128; i++) {
        audioSamples[i] = i * 0.01;
    }

    // 定义方法
    //--------------------------------------------------------------------------------------------------------------

    /**
     * 获取颜色字符串
     *
     * @param c wallpaper颜色格式
     * @return 颜色字符串
     */
    function getColor(c) {
        return c.split(' ').map((index)=> {
            return Math.ceil(index * 255);
        }).toString();
    }

    // VisualizerCircle插件调试区域
    //--------------------------------------------------------------------------------------------------------------

    $('#wallpaper').visualizercircle({
        colorMode: 'rainBow',
        isLineTo: true
    });
    $('#wallpaper').visualizercircle('updateVisualizerCircle', audioSamples);
    $('#wallpaper').visualizercircle('drawVisualizerCircle');

    // VisualizerBars插件调试区域
    //--------------------------------------------------------------------------------------------------------------

    $('#wallpaper').visualizerbars({
        colorMode: 'rainBow'
    });
    $('#wallpaper').visualizerbars('updateVisualizerBars', audioSamples);
    $('#wallpaper').visualizerbars('drawVisualizerBars');

    // Date插件调试区域
    //--------------------------------------------------------------------------------------------------------------

    $('#wallpaper').date({});
    $('#wallpaper').date('set', 'dateStyle', 'weather');

    // Slider插件调试区域
    //--------------------------------------------------------------------------------------------------------------

    $('#wallpaper').slider({});
    $('#wallpaper').slider('addVideo');

    // Logo插件调试区域
    //--------------------------------------------------------------------------------------------------------------

    $('#wallpaper').logo({});
    $('#wallpaper').logo('setUserImg', '');

    // Logo插件调试区域
    //--------------------------------------------------------------------------------------------------------------

})(jQuery, window, document, Math);
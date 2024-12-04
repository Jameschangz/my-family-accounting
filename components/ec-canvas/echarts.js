// echarts.js 精简版本
(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.echarts = {}));
}(this, function(exports) {
    'use strict';

    // 基础工具函数
    function extend(target, source) {
        for (let key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
        return target;
    }

    // 图表基础类
    class ECharts {
        constructor(dom, theme, opts) {
            this.dom = dom;
            this.theme = theme;
            this._options = {};
            this._components = [];
        }

        setOption(option) {
            this._options = extend(this._options, option);
            this._render();
        }

        _render() {
            const ctx = this.dom.getContext('2d');
            ctx.clearRect(0, 0, this.dom.width, this.dom.height);
            
            this._components.forEach(component => {
                component.render(ctx, this._options);
            });
        }

        // 添加组件
        _addComponent(component) {
            this._components.push(component);
        }
    }

    // 饼图组件
    class PieChart {
        render(ctx, options) {
            const series = options.series[0];
            if (!series || series.type !== 'pie') return;

            const center = series.center || ['50%', '50%'];
            const radius = series.radius || ['0%', '75%'];
            const data = series.data || [];

            let total = 0;
            data.forEach(item => {
                total += item.value;
            });

            let startAngle = 0;
            data.forEach(item => {
                const angle = (item.value / total) * Math.PI * 2;
                this._drawPiePiece(ctx, center, radius, startAngle, startAngle + angle, item);
                startAngle += angle;
            });
        }

        _drawPiePiece(ctx, center, radius, startAngle, endAngle, data) {
            ctx.beginPath();
            ctx.moveTo(center[0], center[1]);
            ctx.arc(center[0], center[1], radius[1], startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = data.color || '#' + Math.floor(Math.random()*16777215).toString(16);
            ctx.fill();
        }
    }

    // 折线图组件
    class LineChart {
        render(ctx, options) {
            const series = options.series[0];
            if (!series || series.type !== 'line') return;

            const xAxis = options.xAxis || {};
            const yAxis = options.yAxis || {};
            const data = series.data || [];

            // 绘制坐标轴
            this._drawAxis(ctx, xAxis, yAxis);

            // 绘制数据线
            this._drawLine(ctx, data, xAxis, yAxis);
        }

        _drawAxis(ctx, xAxis, yAxis) {
            // 简单绘制坐标轴
            ctx.beginPath();
            ctx.moveTo(50, 250);
            ctx.lineTo(350, 250);
            ctx.moveTo(50, 250);
            ctx.lineTo(50, 50);
            ctx.stroke();
        }

        _drawLine(ctx, data, xAxis, yAxis) {
            if (data.length < 2) return;

            ctx.beginPath();
            ctx.moveTo(50, 250 - data[0] * 0.5);
            
            for (let i = 1; i < data.length; i++) {
                ctx.lineTo(50 + i * 40, 250 - data[i] * 0.5);
            }

            ctx.strokeStyle = '#1aad19';
            ctx.stroke();
        }
    }

    // 创建图表实例
    function init(dom, theme, opts) {
        const chart = new ECharts(dom, theme, opts);
        chart._addComponent(new PieChart());
        chart._addComponent(new LineChart());
        return chart;
    }

    // 导出接口
    exports.init = init;
    exports.setCanvasCreator = function() {};
}));
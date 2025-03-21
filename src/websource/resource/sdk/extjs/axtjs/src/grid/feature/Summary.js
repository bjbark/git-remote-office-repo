/**
 * Ext.grid.feature.Summary에 기능을 추가하고 버그를 수정하기 위한 상위 클래스
 */
Ext.define('Axt.grid.feature.Summary', {  extend: 'Ext.grid.feature.Summary',

    alias: 'feature.grid-summary',

    dock : 'bottom',
    remote : false ,

	/**
	 * summary의 데이터를 원하는 값으로 update
	 */
	refresh: function(summaryData) {
		var me = this;
		var view = me.view;
		var store = view.store;

		// store proxy reader에 변수로 정의되어있던 summary정보 객체에 refresh할 summaryData를 결합
		if(Ext.isEmpty(store.getProxy().getReader().summary) || summaryData===undefined) {
			store.getProxy().getReader().summary = {};
		}
		if(summaryData) {
			Ext.merge(store.getProxy().getReader().summary, summaryData);
		}

		// summary의 view부분 갱신
		view.refresh();
    },

    /**
     * @private
     * view.findFeature('grid-summary') <== 이부분을 수정<br/>
     * dock을 사용안했을때 위의 부분을 수정안하면 에러가 난다.
     */
    renderTFoot: function(values, out) {
        var view = values.view,
            me = view.findFeature('grid-summary')
        ;
        //console.debug( 'renderTFoot' , [values, out ] ) ;
        if (me.showSummaryRow) {
            out.push('<tfoot>');
            me.outputSummaryRecord(me.createSummaryRecord(view), values, out);
            out.push('</tfoot>');
        }
    },

    /**
     * @private
     * remoteRoot로부터 (서버) 데이터를 읽어서 summary를 갱신해야되지만<br/>
     * 기본 ext js의 summary.getSummary()는 버그가 있으므로 아래와같이 override
     */
    getSummary: function(store, type, field, group) {
    	var me = this;
    	//console.debug( 'field' , store );
    	if (me.remote){
			var summary = store.proxy.reader.summary;
			if (summary && type) {
				if (type == 'count' ) {
					field = 'maxsize';
					if (typeof summary[field] != 'undefined') {
						return Ext.util.Format.number(summary[field], '#,##0');
					}
				} else {
					if (typeof summary[field] != 'undefined') {
						return summary[field];
					}
				}
			}
			return '';
		} else {
			if (type == 'count' ) {
				return Ext.util.Format.number(this.callParent(arguments), '#,##0');
			} else {
				return this.callParent(arguments);
			}
		}
	},

	/**
     * @private
     * grid summary bar가 우측으로 약간 틀어져 있어서 바로 잡음<br/>
     * - 100한 부분이 수정한 부분이다.
     */
    init: function(grid) {
        var me = this,
            view = me.view;

        me.callParent(arguments);

        if (me.dock) {
            grid.headerCt.on({
                afterlayout: me.onStoreUpdate,
                scope: me
            });
            grid.on({
                beforerender: function() {
                    var tableCls = [me.summaryTableCls];
                    if (view.columnLines) {
                        tableCls[tableCls.length] = view.ownerCt.colLinesCls;
                    }
                    me.summaryBar = grid.addDocked({
                        childEls: ['innerCt'],
                        renderTpl: [
                            '<div id="{id}-innerCt">',
                                '<table cellPadding="0" cellSpacing="0" class="' + tableCls.join(' ') + '">',
                                    '<tr class="' + me.summaryRowCls + '"></tr>',
                                '</table>',
                            '</div>'
                        ],
                        style: 'overflow:hidden',
                        itemId: 'summaryBar',
                        cls: [ me.dockedSummaryCls, me.dockedSummaryCls + '-' + me.dock ],
                        xtype: 'component',
                        dock: me.dock,
                        weight: 10000000
                    })[0];
                },
                afterrender: function() {
                    grid.body.addCls(me.panelBodyCls + me.dock);
                    view.mon(view.el, {
                        scroll: me.onViewScroll,
                        scope: me
                    });
                    me.onStoreUpdate();
                },
                single: true
            });

            // Stretch the innerCt of the summary bar upon headerCt layout
            grid.headerCt.afterComponentLayout = Ext.Function.createSequence(grid.headerCt.afterComponentLayout, function() {
                me.summaryBar.innerCt.setWidth(this.getFullWidth() + Ext.getScrollbarSize().width - 100);
            });
        } else {
            me.view.addFooterFn(me.renderTFoot);
        }

        grid.on({
            columnmove: me.onStoreUpdate,
            scope: me
        });

        // On change of data, we have to update the docked summary.
        view.mon(view.store, {
            update: me.onStoreUpdate,
            datachanged: me.onStoreUpdate,
            scope: me
        });
    }

});
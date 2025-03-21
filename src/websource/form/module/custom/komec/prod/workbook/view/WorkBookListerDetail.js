Ext.define('module.custom.komec.prod.workbook.view.WorkBookListerDetail',{extend : 'Axt.grid.Panel',
	alias		: 'widget.module-komec-workbook-detail',
	selModel	: {selType : 'checkboxmodel',mode : 'MULTI'},
	store		: 'module.custom.komec.prod.workbook.store.WorkBookDetail',
	border		: 0,

	columnLines : false,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true,
		getRowClass:function(){
			return _global.options.work_book_tema+"cell";
		}
	},
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function() {
		var me = this, item = {
			xtype : 'grid-paging',
			items : [
			]
		};
		return item;
	},
	listeners : {
		afterrender : function() {
			var sideButton = Ext.dom.Query
					.select('#mainmenu-splitter-collapseEl')[0];
			setTimeout(function() {
				sideButton.click();
			}, 100);
		}
	},

	columnItem : function() {
		var me = this, item = {
			cls : _global.options.work_book_tema + 'grid',
			defaults : {
				style : 'text-align: center;font-size:2.5em !important;'
			},
			items : [
					{	dataIndex : 'prog_stat_dvcd',text : Language.get('', '상태'),width : 70,xtype : 'lookupcolumn',lookupValue : resource.lookup('prog_stat_dvcd'),align : 'center'
					},{	dataIndex : 'invc_numb'		,text : Language.get('', '지시번호'),width : 160,align : 'center'
					},{	dataIndex : 'pdsd_date'		,text : Language.get('', '작업일자'),width : 120,align : 'center'
					},{	dataIndex : 'cstm_name'		,text : Language.get('', '거래처명'),width : 160,align : 'left'
					},{	dataIndex : 'acpt_numb'		,text : Language.get('', '수주번호'),width : 140,align : 'center'
					},{	dataIndex : 'item_name'		,text : Language.get('', '품명'),flex : 1,minWidth : 200
					},{	dataIndex : 'item_spec'		,text : Language.get('', '규격'),width : 140,align : 'left'
					},{	dataIndex : 'modl_name'		,text : Language.get('', '모델명'),width : 140,align : 'left'
					},{	dataIndex : 'indn_qntt',
						text : Language.get('', '지시수량'),
						width : 80,
						align : 'right',
						xtype : 'numericcolumn'
					},{
						header : Language.get('action', '실행'),
						width : 220,
						sortable : false,
						align : 'center',
						renderer : function(val, meta, rec, a,
								b, c) {
							var id = Ext.id();
							Ext.defer(function() {
								Ext.widget('button',
									{	width : 150,
										height : 40,
										renderTo : Ext.query("#"+ id)[0],
										text : '<span class="btnTemp" style="font-size:2em;font-weight: bold;">'+ Language.get('','작업시작')+ '</span>',
										cls : 'btn btn-warning btnTemp '+ _global.options.work_book_tema+ 'button',
										handler : function() { me.mainPopup(rec) },
								});
							}, 50);
							return Ext.String.format(
									'<div id="{0}"></div>', id);
						},
						dataIndex : 'somefieldofyourstore'
					} ]
		};
		return item;
	},
	mainPopup:function(rec){
		resource.loadPopup({
			widget : 'lookup-komec-workbook-main-popup',
			params  : {
				invc_numb : rec.get('invc_numb'),
				cvic_idcd : rec.get('cvic_idcd')
			}
		});
	}
});

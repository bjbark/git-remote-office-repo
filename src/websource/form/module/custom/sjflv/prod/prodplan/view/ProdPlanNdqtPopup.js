Ext.define('module.custom.sjflv.prod.prodplan.view.ProdPlanNdqtPopup', { extend: 'Axt.popup.Upload',
	alias	: 'widget.module-sjflv-prodplanndqt-popup',

	title: '생산계획 소요량 계산',

	closable: true,
	autoShow: true,
	width	: 900,
	height	: 800,
	layout: {
		type: 'border'
	},

	waitMsg : Const.INSERT.mask,

	defaultFocus : 'initfocused',

	/**
	* component 초기화
	*/
	initComponent: function(config){
		var me = this;
		me.items = [me.createForm()];
		me.callParent(arguments);
	},
	/**
	 * 화면폼
	 */
	createForm: function(){
		var me = this,
		form = {
			xtype		: 'form-layout' ,
			region		: 'center',
			border		: false,
			dockedItems	: [ me.createToolBar() ],
			items		: [ me.createGrid(), me.createGrid2() ]
		};
		return form;
	},

	/**
	 * 리스트
	 * @return {Ext.grid.Panel} 리스트 그리드
	 */
	createGrid: function(){
		var me = this,
			grid = {
				xtype		: 'grid-panel',
				name		: 'grid1',
				region		: 'center',
				flex		: 3,
				viewConfig	: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask  } )
				},
				selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
				store		: Ext.create('module.custom.sjflv.prod.prodplan.store.ProdPlanNdqtStore'),
				columns: [
					{	text: Language.get(''	, '품목코드'	)	, dataIndex: 'item_code'		,  width : 100	, style: 'text-align:center'	, align: 'left'
					},{	text: Language.get(''	, '품명'		)	, dataIndex: 'item_name'		,  width : 250	, style: 'text-align:center'	, align: 'left'
					},{ text: Language.get(''	, '규격'		)	, dataIndex: 'item_spec'		,  width : 140	, style: 'text-align:center'	, align: 'left'
					},{ text: Language.get(''	, '소요량'		)	, dataIndex: 'plan_qntt'		,  width : 90	, style: 'text-align:center'	, xtype: 'numericcolumn', format: '#,##0.###'	,
					},{ text: Language.get(''	, '재고량'		)	, dataIndex: 'stok_qntt'		,  width : 90	, style: 'text-align:center'	, xtype: 'numericcolumn', format: '#,##0.###'	,
					},{	text: Language.get(''	, '과부족량'	)	, dataIndex: 'baln_qntt'		,  width : 90	, style: 'text-align:center'	, xtype: 'numericcolumn', format: '#,##0.###'	,
					},{ text: Language.get(''	, '재고여부'	)	, dataIndex: 'need_stok_yorn'	,  width : 80	, style: 'text-align:center'	, align: 'center'
						, renderer: function(val,meta,rec) {
							if (rec.get('baln_qntt') > 0) {
								meta.style = "background-color: red; color: white; margin: 3 0 3 0; font-weight: bold;";
								return 'N';
							} else {
								return 'Y';
							}
						}
					},
				],
				listeners: {
					itemclick: function(self, record, item, index, e, eOpts) {
						me.getOrdersByShortage(record);
					}
				}
			}
		;
		return grid;
	},
	
	createGrid2: function(){
		var me = this,
			grid = {
				xtype		: 'grid-panel',
				name		: 'grid2',
				region		: 'south',
				flex		: 1,
				split		: true,
				viewConfig	: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask  } )
				},
				selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
				store		: Ext.create('module.custom.sjflv.prod.prodplan.store.ShortMtrlOrdrStore'),
				columns: [
					{	text: Language.get(''	, '주문번호'	)	, dataIndex: 'invc_numb'		,  width : 100	, style: 'text-align:center'	, align: 'left'
					},{	text: Language.get(''	, '품명'		)	, dataIndex: 'item_name'		,  width : 250	, style: 'text-align:center'	, align: 'left'
					},{ text: Language.get(''	, '규격'		)	, dataIndex: 'item_spec'		,  width : 140	, style: 'text-align:center'	, align: 'left'
					},{ text: Language.get(''	, '주문수량'	)	, dataIndex: 'invc_qntt'		,  width : 90	, style: 'text-align:center'	, xtype: 'numericcolumn', format: '#,##0.###'	,
					},{ text: Language.get(''	, '소요량'		)	, dataIndex: 'need_qntt'		,  width : 90	, style: 'text-align:center'	, xtype: 'numericcolumn', format: '#,##0.###'	,
					},
				]
			}
		;
		return grid;
	},
	
	createToolBar: function(){
		var me = this,
		toolBar = {
			xtype	: 'toolbar',
			dock	: 'bottom',
			items	: [
				'->' ,
				{ xtype: 'button' , text: Const.CLOSER.text		, iconCls: Const.CLOSER.icon , scope: me , handler: me.close		, cls: 'button-style' }
			]
		};
		return toolBar;
	},
	
	getOrdersByShortage: function(record) {
		var store = this.down('[name=grid2]').getStore(),
			ivstItem = record.get('item_idcd'),
			prntItemMap = new Map(),
			ordr = []
			owner = this.popup.owner;
			
		Ext.Ajax.request({
			url		: _global. location.http () + '/custom/sjflv/prod/prodplan/get/prntitem.do',
			method	: "POST",
			params	: {
				token : _global. token_id ,
				param : JSON.stringify({
					stor_id: _global.stor_id,
					ivst_item_idcd: ivstItem
				})
			},
			async	: false,
			success : function(response, request) {
				var result = Ext.decode(response.responseText);
				result.records.forEach(function(item) {
					if (prntItemMap.get(item.prnt_item_idcd) === undefined) {
						prntItemMap.set(item.prnt_item_idcd, item);
					}
				})
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});
		
		Ext.Array.each(owner.getSelectionModel().getSelection(), function(rec) {
			var item = prntItemMap.get(rec.get('item_idcd'));
			
			if (item) {
				var needQntt = (rec.get('invc_qntt') / (100 - rec.get('incm_loss_rate')) * 100) * (item.mixx_rate / 100);
				var model = Ext.create('module.custom.sjflv.prod.prodplan.model.ShortMtrlOrdrModel', {
					invc_numb: rec.get('invc_numb'),
					invc_qntt: rec.get('invc_qntt'),
					item_name: rec.get('item_name'),
					item_code: rec.get('item_code'),
					need_qntt: needQntt
				});
				ordr.push(model);
			}
  		})
		
		store.loadRecords(ordr);
	}
});
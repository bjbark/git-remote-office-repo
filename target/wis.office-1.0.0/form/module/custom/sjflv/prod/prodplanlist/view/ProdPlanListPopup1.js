Ext.define('module.custom.sjflv.prod.prodplanlist.view.ProdPlanListPopup1', { extend: 'Axt.popup.Upload',
	alias	: 'widget.module-sjflv-prodplanlist-popup1',

	title: '생산계획',

	closable: true,
	autoShow: true,
	width	: 777,
	height	: 500,
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
				dockedItems	: [ me.searchForm() ],
				items		: [ me.createGrid() ]
			};
		return form;
	},

	searchForm: function(){
		var me = this,
			form = {
			xtype		: 'form-search',
			bodyStyle	: { padding: '0', background: 'transparent' },
			layout		: 'vbox',
			items	: [
				{	xtype	: 'fieldset',
					layout	: 'hbox',
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('cstm_name','거래처명'),
							xtype		: 'textfield',
							readOnly	: true,
							name		: 'cstm_name',
							margin		: '0 0 3 15',
							width		: 200,
							labelWidth	: 45,
							value		: me.popup.params.cstm_name,
							fieldCls	: 'readonlyfield'
						}
					]
				}
			],
		};
		return form;
	},

	/**
	 * 리스트
	 * @return {Ext.grid.Panel} 리스트 그리드
	 */
	createGrid: function(){
		var me = this,
		finishText = '<span style="font-size: small !important; color: white;">계획확정</span>',
			grid = {
				xtype		: 'grid-panel',
				region		: 'center',
				viewConfig	: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask  } )
				},
				selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
				features	: [{ ftype : 'grid-summary' }],
				plugins 	: { ptype  : 'cellediting-directinput', clicksToEdit: 1 },
				store		: Ext.create('module.custom.sjflv.prod.prodplanlist.store.ProdPlanListPopupStore1'),
				paging		: {
					xtype	: 'grid-paging',
					items	: [
						'->',
						{ xtype: 'button' , text: Const.CLOSER.text		, iconCls: Const.CLOSER.icon , scope: me , handler: me.close		, cls: 'button-style' }
					]
				},
				columns: [
					{	text : Language.get('item_code'	, '제품코드'	)	, dataIndex: 'item_code'	,  width : 185	, style: 'text-align:center'	, align: 'left'
					},{	text : Language.get('item_name'	, '품명'		)	, dataIndex: 'item_name'	,  width : 185	, style: 'text-align:center'	, align: 'left'
					},{ text : Language.get('item_spec'	, '규격'		)	, dataIndex: 'item_spec'	,  width : 185	, style: 'text-align:center'	, align: 'left'
					},{ text : Language.get('plan_qntt'	, '생산계획량'	)	, dataIndex: 'plan_qntt'	,  width : 80	, style: 'text-align:center'	, align: 'right'	, xtype: 'numericcolumn' , format: '#,##0.###'
					},{ text : Language.get('deli_date'	, '납기일자'	)	, dataIndex: 'deli_date'	,  width : 100	, style: 'text-align:center'	, align: 'center'
					},
				]
			}
		;
		return grid;
	},
});
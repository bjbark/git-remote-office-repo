Ext.define('module.custom.iypkg.prod.prodplan.view.ProdPlanWritePopup2', { extend: 'Axt.popup.Search',

	alias	: 'widget.module-prodplan-write-popup2',
	store	: 'module.custom.iypkg.prod.prodplan.store.ProdPlanWrite2',
	title	: '생산계획 작성' ,
	closable: true,
	autoShow: true,
	width	: 955,
	height	: 390,
	layout	: {
		type: 'border'
	},
	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [me.createGrid(),me.createForm()];
		me.callParent(arguments);

	},

	listeners:{
		render:function(){
			var me = this,
				store = this.down('grid').getStore(),
				store2 = this.down('#grid2').getStore(),
				param = Ext.merge( this.down('form').getValues(), { hq_id : _global.hq_id
				}, this.popup.params )
				master	= Ext.ComponentQuery.query('module-prodplan-master3')[0],
				record	= master.getSelectionModel().getSelection(),
				qntt = 0
			;

			store.load({
				params : { param:JSON.stringify(param) }, scope:this,
				callback:function(records, operation, success) {
				}
			});

			var a = "";
			for(var i =0; i< record.length ; i++){
				if(i==0){
					a += "{\'records\':[";
				}
					a+= '{\'invc_numb\':\''+record[i].get('invc_numb')+'\'}';
				if(i != record.length -1){
					a+=",";
				}else{
					a+="]}";
				}
			}

			store2.load({
				params : { param: a }, scope:this,
				callback:function(records, operation, success) {
					store2.each(function(records){
						records.set('plan_sttm', Ext.Date.format(new Date(), 'Ymd'));
					})
				}
			});
		},
	},

	createForm: function() {
		var me = this,
		form = {
			xtype		: 'form-panel',
			region		: 'center',
			border		: false,
			dockedItems	: [
				{	xtype : 'toolbar',
					dock  : 'bottom',
					items : [
						'->' ,
						{ xtype : 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{ xtype : 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close       ,cls: 'button-style'}
					]
				}
			],
			items : me.editorForm2()
		};
		return form;
	},

	createGrid: function(){
		var  me = this,
			grid = {
				xtype		: 'grid-panel',
				header		: false,
				region		: 'north',
				name		: 'masterGrid',
				height		: 120,
				viewConfig	: {
					loadMask : new Ext.LoadMask( me , { msg: Const.SELECT.mask }),
					enableTextSelection: true
				},
				selModel	:{ selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
				store		: Ext.create( me.store ),
				paging		:{
					xtype : 'grid-paging'
				},
				plugins : [{ptype  :'cellediting-directinput', clicksToEdit: 1 }],

				columns : [
					{	dataIndex : 'invc_numb'		, width:  90, text: Language.get('','수주번호'	) , align:'center'
					},{	dataIndex:	'deli_date'		, width:  80, text: Language.get('', '납기일자') , align:'center'
					},{	dataIndex:	'cstm_name'		, width: 180, text: Language.get('', '거래처'	)
					},{	dataIndex:	'prod_name'		, width: 250, text: Language.get('', '품명'	)
					},{	dataIndex:	'item_leng'		, width:  60, text: Language.get('', '장'	) , align:'right'
					},{	dataIndex:	'item_widh'		, width:  60, text: Language.get('', '폭'	) , align:'right'
					},{	dataIndex:	'item_hght'		, width:  60, text: Language.get('', '고'	) , align:'right'
					},{	dataIndex:	'acpt_qntt'		, width:  80, text: Language.get('', '수주수량') , align:'right'
					},{	dataIndex:	'plan_qntt'		, width:  80, text: Language.get('', '계획수량') , align:'right',hidden : true
						,tdCls		: 'editingcolumn',
						editor	: {
							xtype			: 'numericfield',
							selectOnFocus	: true,
							allowBlank		: true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									}
								}
							}
						}
					}
				]
			}
		;
		return grid;
	},

	editorForm2: function(){
		var  me            = this;
		var  store         = 'module.custom.iypkg.prod.prodplan.store.ProdPlanWriteBop2';
		var  grid = {
				xtype		: 'grid-panel',
				header		: false,
				region		: 'bottom',
				height		: 210,
				id			: 'grid2',
				itemId		: 'grid2',
				name		: 'grid2',
				plugins : [{ptype  :'cellediting-directinput', clicksToEdit: 1 }],
				viewConfig	: {
					loadMask : new Ext.LoadMask( me , { msg: Const.SELECT.mask }),
					enableTextSelection: true
				},
				selModel	:{ selType: 'checkboxmodel', mode : 'SINGLE' },
				store		: Ext.create( store ),
				paging		:{
					xtype : 'grid-paging'
				},
				columns : [
					{	dataIndex:	'acpt_numb'	, width: 150 , align : 'center' , text: Language.get( 'acpt_numb'	, '수주번호'	)
					},{	dataIndex:	'wkct_name'	, width: 100 , align : 'left'   , text: Language.get( 'wkct_name'	, '공정명'		)
					},{	dataIndex : 'acpt_seqn'	, width:  40 , align : 'center' , text: Language.get( 'line_seqn'	, '순번'		), hidden : true,
					},{	dataIndex:	'cstm_idcd'	, width:  80 , align : 'center' , text: Language.get( 'cstm_idcd'	, '거래처id'	), hidden : true
					},{	dataIndex:	'prod_idcd'	, width:  80 , align : 'center' , text: Language.get( 'prod_idcd'	, '품목id'	), hidden : true
					},{	dataIndex : 'wkct_idcd'	, width:  40 , align : 'center' , text: Language.get( 'wkct_idcd'	, '공정ID'	), hidden : true,
					},{	dataIndex : 'wkun_dvcd'	, width:  90 , align : 'center' , text: Language.get( 'wkun_dvcd'	, '작업단위'	), xtype: 'lookupcolumn'  , lookupValue : resource.lookup('wkun_dvcd')
					},{	dataIndex : 'istt_qntt'	, width:  75 , align : 'right'	,text : Language.get( 'istt_qntt'	, '원단입고량'	)
					},{	dataIndex : 'plan_sttm'	, width:  90 , align : 'center' , text: Language.get( 'plan_sttm'	, '시작일자'	),
						tdCls		: 'editingcolumn',
						editor	: {
							xtype		:'datefield',
							allowBlank	: false,
							value		: new Date(),
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							listeners : {
								change : function(val){
									var me = this,
										store = me.up().grid.store,
										v = Ext.Date.format(this.value,'Y-m-d')
									;

									store.each(function(record, idx) {
										record.set('plan_sttm', v);
									});
								}
							}
						},
						renderer : function(val){
							var a = Ext.util.Format.strToDate(val);
							return a;
						}
					},{	dataIndex:	'plan_qntt'		, width:  70 , align : 'right'  , text: Language.get( 'plan_qntt'	, '계획수량') , xtype: 'numericcolumn',
						tdCls		: 'editingcolumn',
						editor	: {
							xtype			: 'numericfield',
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var	grid = self.up('grid'),
											store = grid.getStore(),
											selection = grid.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										var	gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
											index = Ext.Array.indexOf(gridDataIndices,this.name);
											setTimeout(function(){
											grid.plugins[0].startEdit(row+1,grid.columns[index]);
										}, 100)
									}
								}
							}
						},
					},{	dataIndex : 'unit_name'	, width	: 80, align	: 'center'	,text : Language.get('unit_name'	, '수량단위'	)
					},{	dataIndex : 'qntt_unit_idcd', width	: 80, align	: 'center'	,text : Language.get(''	, '작업단위'	), hidden : true
					},{	dataIndex :	'stnd_pric'	, width	: 65, align	: 'right'	,text : Language.get('stnd_pric'	, '단가'		), xtype: 'numericcolumn' , summaryType: 'sum'
					},{	dataIndex : 'remk_text'	, flex	:  1, align	: 'left'	,text : Language.get('remk_text'	, '비고'		) , align:'center',sortable	: false,
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: false
						},
					}
				]
			}
		;
		return grid;
		var me	= this;
		var form = {
				xtype	: 'toolbar',
				dock	: 'bottom',
				layout	: { type: 'hbox', align: 'stretch' },
				height	: 58,
				hidden	: true,
				itemId	: 'searchform',
				items	: [
					{xtype : 'textfield', name : '_set'		, hidden : true
					}
				]
			}
		;
		return form;
	},

	//조회
	selectAction : function(){
		var  me = this,
			store = me.down('grid').getStore(),
			param = Ext.merge( me.down('form').getValues(), {hq_id : _global.hq_id
			}, me.popup.params ),
			me = this,
			store = me.down('#grid2').getStore()
		;
		if (me.popup.apiurl && me.popup.apiurl.search ) {
			store.getProxy().api.read = me.popup.apiurl.search ;
		}
		store.load({
			params:{param:JSON.stringify(param)}, scope:me,
			callback:function(records, operation, success) {
			}
		});
		store2.load({
			params:{param:JSON.stringify(param)}, scope:me,
			callback:function(records, operation, success) {
			}
		});
	},

	//확인
	finishAction: function(){
		var me = this,
			baseform      = me.down('form'),
			values        = baseform.getValues(),
			grid          = me.down('#grid2'),
			selects       = me.down('#grid2').getSelectionModel().getSelection()[0],
			store         = me.down('#grid2').getStore(),
			store1        = me.down('grid').getStore(),
			changes       = store.getUpdatedRecords().length,
			search	= Ext.ComponentQuery.query('module-prodplan-search')[0],
			param	= search.getValues(),
			lister  = Ext.ComponentQuery.query('module-prodplan-master3')[0],
			a = new Array(),
			record	= store.getUpdatedRecords(),
			type = _global.options.prod_order_type,
			rec = '', rec2 = []
		;

		if(type == '수주로 생산지시'){
			for (var s = 0; s < store1.data.length; s++) {
				rec += store1.data.items[s].data.invc_numb;
				if(s != store1.data.length -1){
					rec+=",";
				}
			}

			for(var i=0;i<changes;i++) {
				if(grid.getStore().getUpdatedRecords()[i].data.plan_sttm == null ||grid.getStore().getUpdatedRecords()[i].data.plan_sttm==''){
					Ext.Msg.alert("알림","시작일자를 반드시 입력하십시오.");
					return;
				}
				if(store.getUpdatedRecords()[i].data.plan_qntt == null || store.getUpdatedRecords()[i].data.plan_qntt==''){
					Ext.Msg.alert("알림","계획수량을 입력하여 주십시오.");
					return;
				}
			};

			if(changes != 0){
				for (var i = 0; i < changes; i++) {
					if(store.getUpdatedRecords()[i].data.cvic_idcd == ''){
						store.getUpdatedRecords()[i].data.cvic_idcd = '@'
					}
					rec2.push({
						invc_numb : record[i].data.acpt_numb,
						line_seqn : record[i].data.line_seqn,
						plan_qntt : record[i].data.plan_qntt,
						plan_sttm : record[i].data.plan_sttm,
						cvic_idcd : record[i].data.cvic_idcd
					});
				}

				Ext.Ajax.request({
					url		: _global.location.http() + '/custom/iypkg/prod/prodplan/set/write3.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							stor_id		: _global.stor_id,
							invc		: rec,
							records		: rec2
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						if	(!result.success ){
							Ext.Msg.error(result.message );
							return;
						} else {
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						me.setResponse();
						Ext.Msg.alert("알림", "계획이 등록되었습니다.");
						store.reload();
					}
				});
			}else{
				Ext.Msg.alert("알림","변경된 사항이 없습니다.");
			}
		}
	}
});
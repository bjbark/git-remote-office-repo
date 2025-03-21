Ext.define('module.custom.iypkg.prod.prodplan.view.ProdPlanWritePopup', { extend: 'Axt.popup.Search',

	alias	: 'widget.module-prodplan-write-popup',
	store	: 'module.custom.iypkg.prod.prodplan.store.ProdPlanWrite',
	title	: '생산계획 작성' ,
	closable: true,
	autoShow: true,
	width	: 955,
	height	: 373,
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
				master	= Ext.ComponentQuery.query('module-prodplan-master')[0],
				record	= master.getSelectionModel().getSelection(),
				qntt = 0
			;
			for (var i = 0; i < record.length; i++) {
				record[i].set('rank',i+1);
			}

			store.add(record);
//			store.load({
//				params : { param:JSON.stringify(param) }, scope:this,
//				callback:function(records, operation, success) {
//				}
//			});
//
//			var a = "";
//			for(var i =0; i< record.length ; i++){
//				if(i==0){
//					a += "{\'records\':[";
//				}
//					a+= '{\'invc_numb\':\''+record[i].get('invc_numb')+'\'}';
//				if(i != record.length -1){
//					a+=",";
//				}else{
//					a+="]}";
//				}
//			}

			store2.load({
				params : { param: JSON.stringify(param)  }, scope:this,
				callback:function(records, operation, success) {
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
					},{	dataIndex:	'cstm_name'		, width: 180, text: Language.get('', '거래처'	)
					},{	dataIndex:	'prod_name'		, width: 250, text: Language.get('', '품명'	)
					},{	dataIndex:	'item_leng'		, width:  60, text: Language.get('', '장'	) , align:'right'
					},{	dataIndex:	'item_widh'		, width:  60, text: Language.get('', '폭'	) , align:'right'
					},{	dataIndex:	'item_hght'		, width:  60, text: Language.get('', '고'	) , align:'right'
					},{	dataIndex:	'rank'			, width:  60, text: Language.get('', '순번'	) , align:'right',tdCls	: 'editingcolumn',
						editor		: {
							selectOnFocus	: true,
							allowBlank		: false,
							enableKeyEvents : true,
						}
					}
				]
			}
		;
		return grid;
	},

	editorForm2: function(){
		var  me            = this;
		var  store         = 'module.custom.iypkg.prod.prodplan.store.ProdPlanWriteBop';
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
					{	dataIndex:	'wkct_name'	, width: 100 , align : 'left'   , text: Language.get( 'wkct_name'	, '공정명'		)
					},{	dataIndex : 'wkct_idcd'	, width:  40 , align : 'center' , text: Language.get( 'wkct_idcd'	, '공정ID'	), hidden : true,
					},{	dataIndex:	'cvic_name'	, width: 100, text: Language.get( 'cvic_name'	, '설비'		), align : 'left'   , name : 'cvic_name'
						,tdCls	: 'editingcolumn',
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						allowBlank	: true,
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '설비찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-cvic-popup',
										title	: '설비찾기',
										params : { stor_grp : _global.stor_grp , line_stat : '0' },
										result	: function(records) {
											var	parent = records[0];
											record.set('cvic_idcd',parent.data.cvic_idcd);
											record.set('cvic_name',parent.data.cvic_name);
										},
									})
								},
								scope : me
							}
						]
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
			rec = [], rec2 = []
		;

		if(type == '수주로 생산지시'){
			for (var s = 0; s < store1.data.length; s++) {
				rec.push({
					invc_numb : store1.data.items[s].data.invc_numb,
					rank      : store1.data.items[s].data.rank,
				});
			}
//			for(var i=0;i<changes;i++) {
//				if(grid.getStore().getUpdatedRecords()[i].data.plan_sttm == null ||grid.getStore().getUpdatedRecords()[i].data.plan_sttm==''){
//					Ext.Msg.alert("알림","시작일자를 반드시 입력하십시오.");
//					return;
//				}
//				if(store.getUpdatedRecords()[i].data.plan_qntt == null || store.getUpdatedRecords()[i].data.plan_qntt==''){
//					Ext.Msg.alert("알림","계획수량을 입력하여 주십시오.");
//					return;
//				}
//			};

			if(changes != 0){
				for (var i = 0; i < changes; i++) {
					if(store.getUpdatedRecords()[i].data.cvic_idcd == ''){
						store.getUpdatedRecords()[i].data.cvic_idcd = '@'
					}
					rec2.push({
						invc_numb : record[i].data.acpt_numb,
//						line_seqn : record[i].data.line_seqn,
//						plan_qntt : record[i].data.plan_qntt,
//						plan_sttm : record[i].data.plan_sttm,
						cvic_idcd : record[i].data.cvic_idcd,
						wkct_idcd : record[i].data.wkct_idcd

					});
				}

				Ext.Ajax.request({
					url		: _global.location.http() + '/custom/iypkg/prod/prodplan/set/write.do',
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
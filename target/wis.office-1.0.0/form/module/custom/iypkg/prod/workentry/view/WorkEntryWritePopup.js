Ext.define('module.custom.iypkg.prod.workentry.view.WorkEntryWritePopup', { extend: 'Axt.popup.Search',

	alias	: 'widget.module-workentry-write-popup',
	store	: 'module.custom.iypkg.prod.workentry.store.WorkEntryWrite',
	title	: '생산계획 작성' ,
	closable: true,
	autoShow: true,
	width	: 955,
	height	: 373,
	layout	: {
		type: 'border'
	},
	selModel	: { selType: 'cellmodel'},
	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [me.createGrid(),me.createForm()];
		me.callParent(arguments);

	},

	listeners:{
		render:function(){
			var store = this.down('grid').getStore(),
				store2 = this.down('#grid2').getStore(),
				param = Ext.merge( this.down('form').getValues(), { hq_id : _global.hq_id
				}, this.popup.params )
			;
			console.log(store2);
			store.load({
				params : { param:JSON.stringify(param) }, scope:this,
				callback:function(records, operation, success) {
				}
			});
			store2.load({
				params : { param:JSON.stringify(param) }, scope:this,
				callback:function(records, operation, success) {
					if(param.dvcd != 'modify'){
						setTimeout(function(){
							store2.each(function(records){
								records.set('prod_qntt',records.get('indn_qntt'));
							})
						}, 100)
					}
				}
			});
		}
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
						{ xtype : 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: (me.popup.params.dvcd == 'insert')?me.finishAction:me.modifyAction,cls: 'button-style'},'-',
						{ xtype : 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close       ,cls: 'button-style'}
					]
				}
			],
			items : me.editorForm2(),
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
				height		: 100,
				viewConfig	: {
					loadMask : new Ext.LoadMask( me , { msg: Const.SELECT.mask }),
					enableTextSelection: true
				},
				selModel	:{ selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
				store		: Ext.create( me.store ),
				paging		:{
					xtype : 'grid-paging'
				},
				columns : [
					{	dataIndex : 'acpt_numb'		, width: 110, text: Language.get('', '수주번호'	) , align:'center'
					},{	dataIndex : 'invc_numb'		, width:  90, text: Language.get('', '지시번호'	) , align:'center'
					},{	dataIndex:	'deli_date'		, width:  80, text: Language.get('', '납기일자') , align:'center'
					},{	dataIndex:	'cstm_name'		, width: 180, text: Language.get('', '거래처'	)
					},{	dataIndex:	'prod_name'		, width: 230, text: Language.get('', '품명'	)
					},{	dataIndex:	'prod_leng'		, width:  50, text: Language.get('', '장'	) , align:'right', xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'prod_widh'		, width:  50, text: Language.get('', '폭'	) , align:'right', xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'prod_hght'		, width:  50, text: Language.get('', '고'	) , align:'right', xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'acpt_qntt'		, width:  70, text: Language.get('', '수주수량') , align:'right', xtype: 'numericcolumn', format: '#,##0'
					}
				]
			}
		;
		return grid;
	},

	editorForm2: function(){
		var  me    = this;
		var  store = (me.popup.params.dvcd == 'insert')?'module.custom.iypkg.prod.workentry.store.WorkEntryWriteBop':'module.custom.iypkg.prod.workentry.store.WorkEntryWriteBop2';
		var  grid = {
				xtype		: 'grid-panel',
				header		: false,
				region		: 'bottom',
				height		: 210,
				itemId		: 'grid2',
				name		: 'grid2',
				plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
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
					{	dataIndex:	'wkct_name'		, width: 200 , align : 'left'   , text: Language.get( 'wkct_name'		, '공정명'		)
					},{	dataIndex : 'line_seqn'		, width:  40 , align : 'center' , text: Language.get( 'line_seqn'		, '순번'		) , hidden : true,
					},{	dataIndex:	'prod_idcd'		, width:  80 , align : 'center' , text: Language.get( 'prod_idcd'		, '품목id'	) , hidden : true
					},{	dataIndex : 'wkct_idcd'		, width:  40 , align : 'center' , text: Language.get( 'wkct_idcd'		, '공정ID'	) , hidden : true,
					},{	dataIndex : 'wkun_dvcd'		, width:  90 , align : 'center' , text: Language.get( 'wkun_dvcd'		, '작업단위'	) , xtype: 'lookupcolumn' , lookupValue : resource.lookup('wkun_dvcd')
					},{	dataIndex : 'indn_qntt'		, width:  70 , align : 'right'  , text: Language.get( 'indn_qntt'		, '지시수량'	) , xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex : 'work_strt_dttm', width:  90 , align : 'center' , text: Language.get( 'work_strt_dttm'	, '시작일자'	),
						editor	: {
							xtype			:'datefield',
							allowBlank		: false,
							format			: Const.DATE_FORMAT_YMD_BAR,
						},
						renderer:function(val){
							a = Ext.util.Format.strToDate(val);
							return a;
						}
					},{	dataIndex:	'prod_qntt'		, width:  70 , align : 'right'  , text: Language.get( 'prod_qntt'	, '생산량') , xtype: 'numericcolumn',
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
						}
					},{	dataIndex : 'prog_stat_dvcd'	, width	: 80, align	: 'center'	,text : Language.get('prog_stat_dvcd'	, '상태'	), xtype : 'lookupcolumn' , lookupValue : resource.lookup('prog_stat_dvcd'),
						tdCls		: 'editingcolumn',
						editor	: {
							xtype			: 'lookupfield',
							selectOnFocus	: true,
							allowBlank		: true,
							editable		: false,
							lookupValue		: [['2','중지'],['3','완료']],
							listeners:{
								change : function(){
									var me = this,
										val = this.value,
										grid = me.up('grid'),
										store = me.up().grid.store,
										selection = grid.getSelectionModel().getSelection()[0],
										popup = Ext.ComponentQuery.query('module-workentry-write-popup')[0],
										param = Ext.merge( popup.down('form').getValues(), { hq_id : _global.hq_id
										}, popup.popup.params )
									;
									if(param.dvcd == 'insert'){
										if(val == '2'){
											store.each(function(record, idx) {
												if(selection.data.line_seqn == record.get('line_seqn')){
													record.set('prod_qntt', 0);
												}
											});
										}else{
											store.each(function(record, idx) {
												if(selection.data.line_seqn == record.get('line_seqn')){
													record.set('prod_qntt', record.get('indn_qntt'));
												}
											});
										}
									}
								}
							}
						}
					},{	dataIndex : 'unit_name'			, width	: 80, align	: 'center'	,text : Language.get('unit_name'	, '수량단위'	)
					},{	dataIndex : 'remk_text'			, flex	:  1, align	: 'left'	,text : Language.get('remk_text'	, '비고'		) , align:'center',sortable	: false,
					}
				]
			}
		;
		return grid;
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
			search	= Ext.ComponentQuery.query('module-workentry-search')[0],
			param	= search.getValues(),
			lister  = Ext.ComponentQuery.query('module-workentry-master3')[0],
			record	= lister.getSelectionModel().getSelection(),
			tpanel = Ext.ComponentQuery.query('module-workentry-layout')[0].down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
			line_seqn	= 1
		;

		if(changes == 0){
			Ext.Msg.alert("알림", "변경 된 사항이 없습니다.");
			return;
		}else{
			for(var i=0;i<changes;i++){
				if(store.getUpdatedRecords()[i].data.prod_qntt == 0){
					Ext.Msg.alert("알림", "수량을 입력하여주십시오.");
					return;
				}else if(store.getUpdatedRecords()[i].data.prog_stat_dvcd == ''){
					Ext.Msg.alert("알림", "상태를 선택하여주십시오.");
					return;
				}else{
					Ext.Ajax.request({
						url : _global.location.http() + '/listener/seq/maxid.do',
						object		: resource.keygen,
						params		: {
							token	: _global.token_id ,
							param	: JSON.stringify({
								stor_id		: _global.stor_id,
								table_nm	: 'work_book'
							})
						},
						async	: false,
						success	: function(response, request) {
							var result = Ext.decode(response.responseText);
							new_invc_numb = result.records[0].seq;
						}
					});

					store.getUpdatedRecords()[i].data.new_invc_numb = new_invc_numb;
				}
			}
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			store.sync({
				success : function(operation){ },
				failure : function(operation){ },
				callback: function(operation){
					me.setResponse();
					store.reload();
					Ext.Msg.alert("알림", "실적 등록이 완료 되었습니다.");
					tpanel.items.indexOf(tpanel.setActiveTab(0));
				}
			});
		}
	},

	modifyAction : function(){
		var me = this,
			store		= me.down('#grid2').getStore(),
			changes		= store.getUpdatedRecords().length
		;
		for(var i=0;i<changes;i++){
			if(store.getUpdatedRecords()[i].data.prod_qntt == 0){
				Ext.Msg.alert("알림", "수량을 입력하여주십시오.");
				return;
			}
			if(store.getUpdatedRecords()[i].data.prog_stat_dvcd == ''){
				Ext.Msg.alert("알림", "상태를 선택하여주십시오.");
				return;
			}
		}
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();
		store.sync({
			success : function(operation){ },
			failure : function(operation){ },
			callback: function(operation){
				me.setResponse();
				Ext.Msg.alert("알림", "실적 등록이 수정 되었습니다.");
				mask.hide();
				store.reload();
			}
		});
	}
});
Ext.define('module.custom.inkopack.prod.prodplan.view.ProdPlanWritePopup', { extend: 'Axt.popup.Search',

	alias	: 'widget.module-prodplan-write-popup',
	store	: 'module.custom.inkopack.prod.prodplan.store.ProdPlanWrite',
	title	: '생산계획 작성' ,
	closable: true,
	autoShow: true,
	width	: 1488 ,
	height	: 449,
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
			store.load({
				params : { param:JSON.stringify(param) }, scope:this,
				callback:function(records, operation, success) {
				}
			});
			store2.load({
				params : { param:JSON.stringify(param) }, scope:this,
				callback:function(records, operation, success) {
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
				height		: 127,
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
					{	dataIndex : 'seqn'			, width:  40, text: Language.get('seqn'			,	'순번'		) , align:'center'
					},{	dataIndex : 'line_seqn'		, width:  40, text: Language.get('line_seqn'	,	'번호'		) , align:'center', hidden : true
					},{	dataIndex : 'cstm_lott_numb', width: 100, text: Language.get('cstm_lott_numb',	'LOT 번호'	) , align:'center'
					},{	dataIndex : 'item_code'		, width: 100, text: Language.get('item_code'	,	'품목코드'		) , align:'center'
					},{	dataIndex : 'item_name'		, width: 160, text: Language.get('item_name'	,	'품명'		) , align:'center'
					},{	dataIndex : 'item_spec'		, width: 150, text: Language.get('item_spec'	,	'규격'		) , align:'center'
					},{	dataIndex : 'invc_qntt'		, width:  80, text: Language.get('offr_qntt'	,	'발주수량'		) , xtype: 'numericcolumn', align : 'right', summaryType: 'sum'
					},{	dataIndex : 'qntt'			, width:  80, text: Language.get('upid_qntt'	,	'미납수량'		) , xtype: 'numericcolumn', align : 'right', summaryType: 'sum'
					},{	dataIndex : 'deli_date'		, width:  80, text: Language.get('deli_date'	,	'협력사납기'	) , align:'center'
					},{	dataIndex : 'cstm_deli_date', width:  80, text: Language.get('cstm_deli_date',	'원납기'		) , align:'center'
					},{	dataIndex : 'invc_date'		, width:  80, text: Language.get('offr_date'	,	'발주일자'		) , align:'center'
					},{	dataIndex : 'cstm_drtr_name', width:  80, text: Language.get('cstm_drtr_name',	'담당자'		) , align:'center'
					},{	dataIndex : 'line_stat'		, width:  60, text: Language.get('line_stat'	,	'상태'		) , xtype: 'lookupcolumn'  , lookupValue : resource.lookup('line_stat'), align:'center'
					},{	dataIndex : 'user_memo'		, width:  80, text: Language.get('user_memo'	,	'후공정'		) , align:'center'
					},{	dataIndex : 'deli_chge_resn', width:  80, text: Language.get('deli_chge_resn',	'납기변동사유'	) , align:'center'
					},{	dataIndex : 'invc_pric'		, width:  80, text: Language.get('invc_pric'	,	'단가'		) , xtype: 'numericcolumn', align : 'right', summaryType: 'sum'
					},{	dataIndex : 'invc_amnt'		, width:  80, text: Language.get('invc_amnt'	,	'금액'		) , xtype: 'numericcolumn', align : 'right', summaryType: 'sum'
					},{	dataIndex : 'invc_numb'		, width: 150, text: Language.get('pdsd_numb'	,	'생산계획번호'	) , align:'center'
					},{	dataIndex : 'stok_used_qntt', width:  80, text: Language.get('stok_used_qntt',	'재고사용'		) , align:'center', xtype : 'numericcolumn' , summaryType : 'sum',hidden : true
					},{	dataIndex : 'plan_qntt'		, width:  80, text: Language.get('plan_qntt'	,	'계획수량'		) , align:'center', xtype : 'numericcolumn' , summaryType : 'sum',hidden : true
					},{	dataIndex : 'plan_date'		, width:  80, text: Language.get('plan_date'	,	'시작일시'		) , align:'center',hidden : true
					},{	dataIndex : 'cmpl_schd_date', width:  80, text: Language.get('cmpl_schd_date',	'완료일시'		) , align:'center',hidden : true
					},{	dataIndex : 'item_idcd'		, width:  80, text: Language.get('item_idcd'	,	'품목id'		) , align:'center',hidden : true
					},{	dataIndex : 'cvic_idcd'		, width:  80, text: Language.get('cvic_idcd'	,	'설비id'		) , align:'center',hidden : true
					},{	dataIndex : 'cvic_name'		, width:  80, text: Language.get('cvic_name'	,	'설비명'		) , align:'center',hidden : true
					},{	dataIndex : 'item_lcls_idcd', width:  80, text: Language.get('item_lcls_idcd',	'품목대분류'	) , align:'center',hidden : true
					},{	dataIndex : 'item_mcls_idcd', width:  80, text: Language.get('item_mcls_idcd',	'품목중분류'	) , align:'center',hidden : true
					},{	dataIndex : 'item_scls_idcd', width:  80, text: Language.get('item_scls_idcd',	'품목소분류'	) , align:'center',hidden : true
					},{	dataIndex : 'cstm_idcd'		, width:  80, text: Language.get('cstm_idcd'	,	'거래처'		) , align:'center',hidden : true
					}
				]
			}
		;
		return grid;
	},

	editorForm2: function(){
		var  me            = this;
		var  store         = 'module.custom.inkopack.prod.prodplan.store.ProdPlanWriteBom';
		var mold_find_name = me.popup.params.mold_find_name;
		var wkct_item_idcd = me.popup.params.wkct_item_idcd;
		var  grid = {
				xtype		: 'grid-panel',
				header		: false,
				region		: 'bottom',
				height		: 260,
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

					{	dataIndex : 'line_seqn'		, width:  40, text: Language.get('line_seqn'	,	'순번'			) , align:'center', hidden : false,	sortable	: false
					},{	dataIndex : 'item_code'		, width: 130, text: Language.get('item_code'	,	'품목코드'		) , align:'center', sortable : false
					},{	dataIndex : 'item_name'		, width: 230, text: Language.get('item_name'	,	'품명'			) , align:'center', sortable : false
					},{	dataIndex : 'wkfw_name'		, width: 190, text: Language.get('wkfw'			,	'생산라인'		) , align:'center', sortable : false
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '생산라인찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-wkfw-popup',
										title	: '생산라인',
										params : { stor_grp : _global.stor_grp , line_stat : '0' },
										result	: function(records) {
											var	parent = records[0];
											record.set('wkfw_idcd',parent.data.wkfw_idcd);
											record.set('wkfw_name',parent.data.wkfw_name);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex : 'lott_numb'		, width: 140, text: Language.get('lott_numb'	,	'LOT번호'		) , align:'center',sortable	: false,
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: false
						},
					},{	dataIndex : 'stok_used_qntt'	, width: 80, text: Language.get('stok_used_qntt'	,	'재고사용수량'	) , xtype: 'numericcolumn', align : 'right', summaryType: 'sum',sortable	: false,
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents: true ,
							listeners	: {
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == 9) {
										var grid1 = this.ownerCt.grid;
										var pos   = grid1.getSelectionModel().getCurrentPosition().row;
										var grid  =  grid1.getStore().getRange();
										var stok_used_qntt = this.lastValue;
										var unit_qntt      = grid[pos].get('unit_qntt');
										var qntt           = unit_qntt-stok_used_qntt;

										if(qntt<0){
											Ext.Msg.alert("알림","재고사용수량을 다시 입력해주십시오.");
										}else{
											grid[pos].set('unit_qntt',qntt);
										}
									}
								}
							}
						},
					},{	dataIndex : 'unit_qntt'		, width:  80, text: Language.get('unit_qntt'		,	'지시수량'		) , xtype: 'numericcolumn', align : 'right', summaryType: 'sum',sortable	: false,
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false
						},
						listeners:{
							afterrender:function(a){
								setTimeout(function(){										//render하면서 바로 구할 수 없음 시간 텀 필요
									var store = me.down('[name=masterGrid]').getStore();
									var store2 = me.down('#grid2').getStore();
									var grid  =  store2.getRange();							// 현재 그리드 값
									var value = 0;
									for (var i = 0; i < store.data.items.length; i++) {
										value += Number(store.data.items[i].data.qntt);		// master 그리드 값 가져와서 저장
									}
									for (var i = 0; i < store2.data.items.length; i++) {
										grid[i].set('unit_qntt',value);						// 각 row에 데이터 저장
									}
								},400);//최소 시간텀(0.2초)
							}
						}
					},{	dataIndex : 'plan_sttm1'		, width: 90, text: Language.get('plan_sttm1'	,	'시작일자'		) , align:'center',sortable	: false,
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'datefield',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							selectOnFocus: true,
							allowBlank	: false,
						},
						renderer : Ext.util.Format.dateRenderer('Y-m-d'),
					},{	dataIndex : 'pref_rank'		, width: 60, text: Language.get('pref_rank'	,	'우선순위'			) , align:'center',sortable	: false,
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false
						},
					},{	dataIndex : 'remk_text'		, width: 100, text: Language.get('remk_text'	,	'비고'			) , align:'center',sortable	: false,
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
			changes       = me.down('#grid2').getStore().getUpdatedRecords().length,
			search	= Ext.ComponentQuery.query('module-prodplan-search')[0],
			param	= search.getValues(),
			lister  = Ext.ComponentQuery.query('module-prodplan-lister1')[0],
			record	= lister.getSelectionModel().getSelection(),
			strt_date
		;
		for(var i=0;i<changes;i++) {
			if(grid.getStore().getUpdatedRecords()[i].data.wkfw_idcd == null ||grid.getStore().getUpdatedRecords()[i].data.wkfw_idcd==''){
				Ext.Msg.alert("알림","생산라인을 반드시 입력하십시오.");
				return;
			}else if(grid.getStore().getUpdatedRecords()[i].data.unit_qntt == null ||grid.getStore().getUpdatedRecords()[i].data.unit_qntt==''){
				Ext.Msg.alert("알림","지시수량을 반드시 입력하십시오.");
				return;
			}else if(grid.getStore().getUpdatedRecords()[i].data.plan_sttm1 == null ||grid.getStore().getUpdatedRecords()[i].data.plan_sttm1==''){
				Ext.Msg.alert("알림","시작일자를 반드시 입력하십시오.");
				strt_date = 0;
				return;
			}
		};
		if(changes == 0){
			Ext.Msg.alert("알림", "변경 된 사항이 없습니다.");
		}else{
			var a =[];
			for(var i =0; i< record.length ; i++){
				a.push({invc_numb : record[i].get('invc_numb'),line_seqn : record[i].get('line_seqn')});
			}

			if(strt_date != 0){
				strt_date = store.data.items[0].data.plan_sttm1.replace(/-/g,"");
				console.log(strt_date);
			}

			var val = JSON.stringify({
				lott_numb		: values.lott_numb,
				stok_used_qntt	: values.stok_used_qntt,				//
				invc_qntt		: store.data.items[0].data.unit_qntt,	//
				strt_date		: strt_date,
				strt_time		: "",
				endd_date		: "",
				endd_time		: "",
				wkfw_idcd		: store.data.items[0].data.wkfw_idcd,
				pref_rank		: values.pref_rank,
				stor_id			: _global.stor_id,
				hqof_idcd		: _global.hqof_idcd,
				records			: a
			});
		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/inkopack/prod/prodplan/set/write.do',
			params	: {
				token : _global.token_id,
				param :  JSON.stringify({
					param	: val
					}),
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						Ext.Msg.error(result.message );
						return;
					} else {
						var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
						mask.show();
						lister.select({
							 callback : function(records, operation, success) {
								if (success) {
								} else {}
								mask.hide();
							}, scope : me
						});
						me.hide();
					}
					Ext.Msg.alert("알림", "생산계획이 완료 되었습니다.");
					lister.getStore().reload();
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}
	}
});
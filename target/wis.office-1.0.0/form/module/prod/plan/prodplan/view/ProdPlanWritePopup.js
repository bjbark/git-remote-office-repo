Ext.define('module.prod.plan.prodplan.view.ProdPlanWritePopup', { extend: 'Axt.popup.Search',

	alias	: 'widget.module-prodplan-write-popup',
	store	: 'module.prod.plan.prodplan.store.ProdPlanWrite',
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
					{	dataIndex : 'seqn'			, width:  40, text: Language.get('seqn'			,	'순번'		) , align:'center',	sortable	: false
					},{	dataIndex : 'line_seqn'		, width:  40, text: Language.get('line_seqn'	,	'번호'		) , align:'center', hidden : true,	sortable	: false
					},{	dataIndex : 'cstm_lott_numb', width: 100, text: Language.get('cstm_lott_numb',	'LOT 번호'	) , align:'center',	sortable	: false
					},{	dataIndex : 'item_code'		, width: 100, text: Language.get('item_code'	,	'품목코드'	) , align:'center',	sortable	: false
					},{	dataIndex : 'item_name'		, width: 160, text: Language.get('item_name'	,	'품명'		) , align:'center',	sortable	: false
					},{	dataIndex : 'item_spec'		, width: 150, text: Language.get('item_spec'	,	'규격'		) , align:'center',	sortable	: false
					},{	dataIndex : 'invc_qntt'		, width:  80, text: Language.get('invc_qntt'	,	'발주수량'	) , xtype: 'numericcolumn', align : 'right', summaryType: 'sum',	sortable	: false
					},{	dataIndex : 'qntt'			, width:  80, text: Language.get('qntt'			,	'미납수량'	) , xtype: 'numericcolumn', align : 'right', summaryType: 'sum',	sortable	: false
					},{	dataIndex : 'deli_date'		, width:  80, text: Language.get('deli_date'	,	'협력사납기'	) , align:'center',	sortable	: false
					},{	dataIndex : 'cstm_deli_date', width:  80, text: Language.get('cstm_deli_date',	'납기일자'	) , align:'center',	sortable	: false
					},{	dataIndex : 'invc_date'		, width:  80, text: Language.get('offr_date'	,	'발주일자'	) , align:'center',	sortable	: false
					},{	dataIndex : 'cstm_drtr_name', width:  80, text: Language.get('cstm_drtr_name',	'담당자'		) , align:'center',	sortable	: false ,hidden:true
					},{	dataIndex : 'line_stat'		, width:  60, text: Language.get('line_stat'	,	'상태'		) , xtype: 'lookupcolumn'  , lookupValue : resource.lookup('line_stat'), align:'center',	sortable	: false,hidden: true
					},{	dataIndex : 'remk_text'		, width:  80, text: Language.get('remk_text'	,	'후공정'		) , align:'center',	sortable	: false
					},{	dataIndex : 'user_memo'		, width:  80, text: Language.get(''				,	'발주품목비고'	) , align:'center',	sortable	: false,
					},{	dataIndex : 'deli_chge_resn', width:  80, text: Language.get('deli_chge_resn',	'(협력사)변경사유'	) , align:'center',	sortable	: false
					},{	dataIndex : 'invc_pric'		, width:  80, text: Language.get('invc_pric'	,	'단가'		) , xtype: 'numericcolumn', align : 'right', summaryType: 'sum',	sortable	: false
					},{	dataIndex : 'invc_amnt'		, width:  80, text: Language.get('invc_amnt'	,	'금액'		) , xtype: 'numericcolumn', align : 'right', summaryType: 'sum',	sortable	: false
					},{	dataIndex : 'invc_numb'		, width: 150, text: Language.get('pdsd_numb'	,	'생산계획번호'	) , align:'center',	sortable	: false
					},{	dataIndex : 'stok_used_qntt', width:  80, text: Language.get('stok_used_qntt',	'재고사용'	) , align:'center', xtype : 'numericcolumn' , summaryType : 'sum',hidden : true,	sortable	: false
					},{	dataIndex : 'plan_qntt'		, width:  80, text: Language.get('plan_qntt'	,	'계획수량'	) , align:'center', xtype : 'numericcolumn' , summaryType : 'sum',hidden : true,	sortable	: false
					},{	dataIndex : 'plan_date'		, width:  80, text: Language.get('plan_date'	,	'시작일시'	) , align:'center',hidden : true,	sortable	: false
					},{	dataIndex : 'cmpl_schd_date', width:  80, text: Language.get('cmpl_schd_date',	'완료일시'	) , align:'center',hidden : true,	sortable	: false
					},{	dataIndex : 'item_idcd'		, width:  80, text: Language.get('item_idcd'	,	'품목id'		) , align:'center',hidden : true,	sortable	: false
					},{	dataIndex : 'cvic_idcd'		, width:  80, text: Language.get('cvic_idcd'	,	'설비id'		) , align:'center',hidden : true,	sortable	: false
					},{	dataIndex : 'cvic_name'		, width:  80, text: Language.get('cvic_name'	,	'설비명'		) , align:'center',hidden : true,	sortable	: false
					},{	dataIndex : 'item_lcls_idcd', width:  80, text: Language.get('item_lcls_idcd',	'품목대분류'	) , align:'center',hidden : true,	sortable	: false
					},{	dataIndex : 'item_mcls_idcd', width:  80, text: Language.get('item_mcls_idcd',	'품목중분류'	) , align:'center',hidden : true,	sortable	: false
					},{	dataIndex : 'item_scls_idcd', width:  80, text: Language.get('item_scls_idcd',	'품목소분류'	) , align:'center',hidden : true,	sortable	: false
					},{	dataIndex : 'cstm_idcd'		, width:  80, text: Language.get('cstm_idcd'	,	'거래처'		) , align:'center',hidden : true,	sortable	: false
					}
				]
			}
		;
		return grid;
	},

	editorForm2: function(){
		var  me            = this;
		var  store         = 'module.prod.plan.prodplan.store.ProdPlanWriteBom';
		var mold_find_name = me.popup.params.mold_find_name;
		var wkct_item_idcd = me.popup.params.wkct_item_idcd;
		var  grid = {
				xtype		: 'grid-panel',
				header		: false,
				region		: 'bottom',
				height		: 260,
				itemId		: 'grid2',
				plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
				viewConfig	: {
					loadMask : new Ext.LoadMask( me , { msg: Const.SELECT.mask }),
					enableTextSelection: true
				},
				selModel	:{ selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
				store		: Ext.create( store ),
				paging		:{
					xtype : 'grid-paging'
				},
				columns : [
					{	dataIndex : 'new_invc_numb'	, width:  40, text: Language.get('new_invc_numb',	'new_invc_numb'	) , align:'center', hidden : true,	sortable	: false
					},{	dataIndex : 'line_seqn'		, width:  40, text: Language.get('line_seqn'	,	'순번'			) , align:'center', hidden : false,	sortable	: false
					},{	dataIndex : 'bomt_degr'		, width:  40, text: Language.get('bomt_degr'	,	'bom차수'		) , align:'center', hidden : true,	sortable	: false
					},{	dataIndex : 'item_idcd'		, width:  40, text: Language.get('item_idcd'	,	'품목ID'			) , align:'center', hidden : true,	sortable	: false
					},{	dataIndex : 'item_code'		, width: 130, text: Language.get('item_code'	,	'품목코드'		) , align:'center',sortable	: false
					},{	dataIndex : 'item_name'		, width: 180, text: Language.get('item_name'	,	'품명'			) , align:'center',sortable	: false
					},{	dataIndex : 'cvic_idcd'		, width:  40, text: Language.get('cvic_idcd'	,	'설비ID'			) , align:'center', hidden : true,	sortable	: false
					},{	dataIndex : 'cvic_name'		, width:  100, text: Language.get('line_seqn'	,	'설비명'			) , align:'center',	sortable	: false
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '설비찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-cvic-popup',
										params	: {find : ''},
										result	: function(records) {
											var	parent = records[0];
											record.set('cvic_idcd',parent.data.cvic_idcd);
											record.set('cvic_name',parent.data.cvic_name);
											record.set('cvic_code',parent.data.cvic_code);
											record.set('wkct_item_idcd',wkct_item_idcd);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex : 'mold_idcd', width: 100, text: Language.get('acpt_numb',	'금형ID'	) , align:'center',hidden:true,	sortable	: false
					},{	dataIndex : 'mold_code', width:  90, text: Language.get('acpt_numb',	'금형코드'	) , align:'center',	sortable	: false
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '금형찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-prod-mold-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0' , find : record.get('item_idcd').substring(0, 5)},
										result	: function(records) {
											var	parent = records[0];
											record.set('mold_idcd',parent.data.mold_idcd);
											record.set('mold_code',parent.data.mold_code);
											record.set('mold_name',parent.data.mold_name);
											record.set('mtrl_bacd',parent.data.mtrl_bacd);
											record.set('mtrl_name',parent.data.mtrl_name);
											console.log(parent)
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex : 'mtrl_bacd'		, width: 100, text: Language.get('mtrl_bacd'	,	'재질bacd'	) , align:'center',hidden:true,sortable	: false
					},{	dataIndex : 'mtrl_name'		, width:  90, text: Language.get('mtrl_name'	,	'재질'		) , align:'center',sortable	: false
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '재질찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-prod-base-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '3101'},
										result	: function(records) {
											var	parent = records[0];
											record.set('mtrl_bacd',parent.data.base_code);
											record.set('mtrl_name',parent.data.base_name);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex : 'pckg_cotr_bacd'		, width: 160, text: Language.get('pckg_cotr_bacd'	,	'포장용기'		) , align:'center',hidden:true
					},{	dataIndex : 'pckg_cotr_name'		, width: 100, text: Language.get('pckg_cotr_name'	,	'포장용기'		) , align:'center',sortable	: false
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '포장용기찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-base-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '8004'},
										result	: function(records) {
											var	parent = records[0];
											record.set('pckg_cotr_bacd',parent.data.base_code);
											record.set('pckg_cotr_name',parent.data.base_name);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex : 'lott_numb'		, width: 100, text: Language.get('lott_numb'			,	'LOT번호'		) , align:'center',sortable	: false,
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: false
						},
					},{	dataIndex : 'stok_used_qntt'	, width: 100, text: Language.get('stok_used_qntt'	,	'재고사용수량'	) , xtype: 'numericcolumn', align : 'right', summaryType: 'sum',sortable	: false,
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
									var store = me.down('grid').getStore();
									var store2 = me.down('#grid2').getStore();
									var grid  =  store2.getRange();							// 현재 그리드 값
									var value = 0;
									for (var i = 0; i < store.data.items.length; i++) {
										value += Number(store.data.items[i].data.qntt);		// 첫번째 그리드 값 가져와서 저장
									}
									if(store2.data.items.length >1){
										for (var i = 0; i < store2.data.items.length; i++) {
											grid[i].set('unit_qntt',value);						// 각 row에 데이터 저장
										}
									}
								},400);//최소 시간텀(0.2초)
							}
						}
					},{	dataIndex : 'plan_sttm1'		, width: 100, text: Language.get('plan_sttm1'	,	'시작일자'		) , align:'center',sortable	: false,
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'datefield',
							format		: 'Y-m-d',
							submitFormat: 'Ymd',
							selectOnFocus: true,
							allowBlank	: false,
						},
						renderer:function(val){
							var a = null;
							if(typeof(val)=='string'){
								a = val;
							}else{
								var date1 = new Date(val);
									date2 = Ext.Date.format(date1,'Y-m-d'),
									a = date2,
									tempY = val.getFullYear(),
									tempM = val.getMonth()+1;
									tempD = val.getDate();
									y=null,
									m= null,
									d= null
								;
								if(tempY<10){
									y = '0'+tempY;
								}else{
									y = ''+tempY;
								}
								if(tempM<10){
									m = '0'+tempM;
								}else{
									m = ''+tempM;
								}
								if(tempD<10){
									d = '0'+tempD;
								}else{
									d = ''+tempD;
								}
								var value = y+"-"+m+"-"+d;
								var value2 = y+m+d;
								var pos = this.view.getSelectionModel().getCurrentPosition().row;
								var grid1 = this;
								var grid =  grid1.getStore().getRange();
								grid[pos].data.plan_sttm4 = value2;
							}
							return a;
						},
					},{	dataIndex : 'plan_sttm2'	, width:  80, text: Language.get('plan_sttm2'	,	'시작시간'		) , align:'center',sortable	: false,
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'timefield',
							format		: 'H:i',
							submitFormat: 'Hi',
							selectOnFocus: true,
							allowBlank	: false,
						},
						renderer:function(val){
							var a = null;
							if(typeof(val)=='string'){
								a = val;
							}else{
								var time1 = new Date(val);
									time2 = Ext.Date.format(time1,'H:i'),
									a = time2,
									tempH = val.getHours(),
									tempM = val.getMinutes();
									h=null,
									m= null
								;
								if(tempH<10){
									h = '0'+tempH;
								}else{
									h = ''+tempH;
								}
								if(tempM<10){
									m = '0'+tempM;
								}else{
									m = ''+tempM;
								}
								var value = h+":"+m;
								var value2 = h+m;
								var pos = this.view.getSelectionModel().getCurrentPosition().row;
								var grid1 = this;
								var grid =  grid1.getStore().getRange();
								console.log(grid);
								console.log(pos);
								grid[pos].data.plan_sttm3 = value2;
							}
							return a;
						},
					},{	dataIndex : 'plan_edtm1'		, width:  100, text: Language.get('plan_edtm1'	,	'완료일자'		) , align:'center',sortable	: false,
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'datefield',
							selectOnFocus: true,
							allowBlank	: false,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
						},
						renderer : Ext.util.Format.dateRenderer('Y-m-d'),
					},{	dataIndex : 'plan_edtm2'	, width:  80, text: Language.get('plan_edtm2'	,	'완료시간'		) , align:'center',sortable	: false,
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'timefield',
							selectOnFocus: true,
							allowBlank	: false,
							format		: 'H:i',
							submitFormat: 'Hi',
						},
						renderer : Ext.util.Format.dateRenderer('H:i'),
					},{	dataIndex : 'remk_text'		, width: 100, text: Language.get('remk_text'	,	'비고'			) , align:'center',sortable	: false,
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: false
						},
					},{	dataIndex : 'acpt_numb'		, width: 160, text: Language.get('acpt_numb'	,	'수주번호'		) , align:'center',hidden : true
					},{	dataIndex : 'acpt_seqn'		, width:  70, text: Language.get('acpt_seqn'	,	'수주순번'		) , align:'center',hidden : true
					},{	dataIndex : 'plan_sttm3'	, width: 100, text: Language.get('plan_sttm3'	,	'시작시간'		) , align:'center',hidden : true
					},{	dataIndex : 'plan_edtm3'	, width: 100, text: Language.get('plan_edtm3'	,	'완료시간'		) , align:'center',hidden : true
					},{	dataIndex : 'plan_sttm4'	, width: 100, text: Language.get('plan_sttm4'	,	'시작일자'		) , align:'center',hidden : true
					},{	dataIndex : 'wkct_item_idcd', width: 100, text: Language.get('wkct_item_idcd',	'공정ITEM'	) , align:'center',hidden : true
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
			store2 = me.down('#grid2').getStore()
		;
		if (me.popup.apiurl && me.popup.apiurl.search ) {
			store.getProxy().api.read = me.popup.apiurl.search ;
		}
		console.log(param);
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
			grid          = me.down('#grid2'),
			selects       = me.down('#grid2').getSelectionModel().getSelection()[0],
			store         = me.down('#grid2').getStore(),
			changes       = me.down('#grid2').getStore().getUpdatedRecords().length,
			search	= Ext.ComponentQuery.query('module-prodplan-search')[0],
			param	= search.getValues(),
			lister  = Ext.ComponentQuery.query('module-prodplan-lister1')[0]
		;
		for(var i=0;i<changes;i++) {
			if(grid.getStore().getUpdatedRecords()[i].data.cvic_idcd == null ||grid.getStore().getUpdatedRecords()[i].data.cvic_idcd==''){
				Ext.Msg.alert("알림","설비를 반드시 입력하십시오.");
				return;
			}else if(grid.getStore().getUpdatedRecords()[i].data.mtrl_bacd == null ||grid.getStore().getUpdatedRecords()[i].data.mtrl_bacd==''){
				Ext.Msg.alert("알림","재질을 반드시 입력하십시오.");
				return;
			}else if(grid.getStore().getUpdatedRecords()[i].data.pckg_cotr_bacd == null ||grid.getStore().getUpdatedRecords()[i].data.pckg_cotr_bacd==''){
				Ext.Msg.alert("알림","포장용기를 반드시 입력하십시오.");
				return;
			}else if(grid.getStore().getUpdatedRecords()[i].data.lott_numb == null ||grid.getStore().getUpdatedRecords()[i].data.lott_numb==''){
				Ext.Msg.alert("알림","LOT번호를 반드시 입력하십시오.");
				return;
			}else if(grid.getStore().getUpdatedRecords()[i].data.unit_qntt == null ||grid.getStore().getUpdatedRecords()[i].data.unit_qntt==''){
				Ext.Msg.alert("알림","지시수량을 반드시 입력하십시오.");
				return;
			}else if(grid.getStore().getUpdatedRecords()[i].data.plan_sttm1 == null ||grid.getStore().getUpdatedRecords()[i].data.plan_sttm1==''){
				Ext.Msg.alert("알림","시작일자를 반드시 입력하십시오.");
				return;
			}else if(grid.getStore().getUpdatedRecords()[i].data.plan_sttm2 == null ||grid.getStore().getUpdatedRecords()[i].data.plan_sttm2==''){
				Ext.Msg.alert("알림","시작시간을 반드시 입력하십시오.");
				return;
			}
		};
		if(changes == 0){
			Ext.Msg.alert("알림", "변경 된 사항이 없습니다.");
		}else{
			Ext.Ajax.request({
				url : _global.location.http() + '/listener/seq/maxid.do',
				object		: resource.keygen,
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						stor_id		: _global.stor_id,
						table_nm	: 'pror'
					})
				},
				async	: false,
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					new_invc_numb = result.records[0].seq;
				}
			});
			for(var i=0;i<changes;i++){
				store.getUpdatedRecords()[i].data.new_invc_numb = new_invc_numb;
			}

			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			store.sync({
				success : function(operation){ },
				failure : function(operation){ },
				callback: function(operation){
					mask.hide();
				}
			});
			this.close();
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	}
});
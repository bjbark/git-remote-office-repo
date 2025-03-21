Ext.define('module.prod.project.prjtworkentry.view.PrjtWorkEntryListerDetail3', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtworkentry-detail3'			,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.prod.project.prjtworkentry.store.PrjtWorkEntryDetail3',
	border		: 0,

	columnLines : false,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true,
		getRowClass:function(){
			return _global.hq_id+"cell";
		}
	},
	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-prjtworkentry-detailSearch'}];
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				cls: _global.hq_id+'grid',
				defaults: {style: 'text-align: center;font-size:3em !important;'},
				items : [
					{	dataIndex: 'prog_stat_dvcd'	, text : Language.get('prog_stat_dvcd'	,'상태'		)	, width	:80	, xtype : 'lookupcolumn', lookupValue : [["0","대기"],["1","진행중"],["2","지연"],["3","완료"]], align : 'center'
					},{ dataIndex: 'idcd'			, text : Language.get('idcd'			,'지시번호'		)	, flex	: 2		, align : 'center',hidden:true
					},{	dataIndex: 'work_ordr_dvcd'	, text : Language.get('work_ordr_dvcd'	,'작업구분'		)	, width	:100	, xtype : 'lookupcolumn', lookupValue	: resource.lookup('work_ordr_dvcd'), align : 'center'
					},{ dataIndex: 'invc_date'		, text : Language.get('indn_date'		,'지시일자'		)	, flex	: 2		, align:'center',hidden:true
					},{ dataIndex: 'work_sttm'		, text : Language.get('work_sttm'		,'시작시간'		)	, width	: 80	, align : 'center',
					},{ dataIndex: 'work_edtm'		, text : Language.get('work_edtm'		,'종료시간'		)	, width	: 80	, align : 'center'
					},{ dataIndex: 'pjod_idcd'		, text : Language.get('pjod_idcd'		,'금형번호'		)	, width	: 120	, align : 'center'
					},{ dataIndex: 'mold_name'		, text : Language.get('acpt_case_name'	,'금형명'		)	, flex	: 1
					},{ dataIndex: 'work_cont'		, text : Language.get('work_cont'		,'작업품명'		)	, width	: 100
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'공정명'		)	, width:100
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		)	, flex	: 2		, hidden:true
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'		,'지시수량'		)	, flex	: 2		, xtype:'numericcolumn',hidden : true
					},{ dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일자'		)	, flex	: 2		, align : 'center',hidden:true
					},{ dataIndex: 'user_name'		, text : Language.get('wker'			,'작업자'		)	, width	: 200,
					},{ dataIndex: 'work_date'		, text : Language.get('work_date'		,'작업일자'		)	, flex	: 2		, hidden:true
					},{ dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번'		)	, flex	: 2		, hidden:true
					},{ dataIndex: 'line_seqn2'		, text : Language.get('line_seqn2'		,'순번'		)	, flex	: 2		, hidden:true
					},{ dataIndex: 'ordr_degr'		, text : Language.get('ordr_degr'		,'오더차수'		)	, flex : 2,hidden:true
					},{ dataIndex: 'wkct_idcd'		, text : Language.get('wkct_idcd'		,'공정'		)	, flex : 2,hidden:true
					},{ dataIndex: 'work_item_idcd'	, text : Language.get('work_item_idcd'	,'work_item_idcd')	, flex : 2,hidden:true
					},{ dataIndex: 'prog_stat_dvcd'	, text : Language.get('prog_stat_dvcd'	,'진행상태구분코드')	, flex : 2		, hidden:true
					},{ header: '실행',
						sortable: false,
						width:300,
						align : 'center',
						renderer: function(val,meta,rec) {
							var id     = Ext.id(),
								search = Ext.ComponentQuery.query('module-prjtworkentry-detailSearch')[0]
								value  = search.getValues()
							;
							var prog_stat_dvcd = value.prog_stat_dvcd; // 0 대기 , 2 중단 ,3 완료
							if(prog_stat_dvcd == '0'|| prog_stat_dvcd == '2'){
								Ext.defer(function() {
									Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											width:120,
											height: 40,
											text: '<span class="btnTemp" style="font-size:2em;font-weight: bold;">시작</span>',
											cls:'btn btn-success btnTemp '+_global.hq_id+'button',
											handler: function(){me.insert(rec)}
									});
								}, 50);
							}else if(prog_stat_dvcd == '3'){
								Ext.defer(function() {
									Ext.widget('button', {
										width:120,
										height: 40,
										margin: "0 10px 0 0",
										renderTo: Ext.query("#"+id)[0],
										text: '<span class="btnTemp" style="font-size:2em;font-weight: bold;">추가작업</span>',
										cls:'btn btn-warning btnTemp '+_global.hq_id+'button',
										handler:  function(){me.restart(rec)},
									});
									Ext.widget('button', {
										width:120,
										height: 40,
										renderTo: Ext.query("#"+id)[0],
										text: '<span class="btnTemp" style="font-size:2em;font-weight: bold;">취소</span>',
										cls:'btn btn-primary btnTemp '+_global.hq_id+'button',
										handler:  function(){me.cancel(rec)},
									});
								}, 50);
							}
							return Ext.String.format('<div id="{0}"></div>', id);
						},
						dataIndex: 'somefieldofyourstore'
					}
				]
			}
		;
		return item;
	},
	insert : function (rec) {
		var search = Ext.ComponentQuery.query('module-prjtworkentry-detailSearch')[0],
			store = this.getStore(),
			wkct_idcd = rec.get('wkct_idcd')
		;
		var	form = Ext.widget('form', {
				border: false,
				bodyPadding: 10,
				fieldDefaults: {
					labelWidth: 200,
					labelStyle: 'text-align:right',
					labelSeparator : '',
				},
				items:[
					{	fieldLabel	: Language.get('work_date','작업일자'),
						name		: 'work_date',
						xtype		: 'datefield',
						value		: new Date(),
						width		: 550,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						trigger1Cls : _global.hq_id+'dateTrigger',
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						maxValue	: new Date(),
						listeners:{
						}
					},{	fieldLabel	: Language.get('work_sttm','시작시간'),
						name		: 'work_sttm',
						xtype		: 'timefield',
						format		: 'H:i',
						submitFormat: 'Hi',
						hideTrigger	: true,
						value		: new Date(),
						minValue: '00:00 AM',
						maxValue: '23:59 PM',
						width		: 533,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						listConfig:{
							itemCls		: _global.hq_id+'item'											// lookup list에 클래스 추가
						},
					},{	fieldLabel	: Language.get('wker_idcd_1fst','작업자'),
						value		: '',
						width		: 550,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'wker_name_1fst',
						pair		: 'wker_idcd_1fst',
						trigger1Cls : _global.hq_id+'searchTrigger',
						clearable	: false ,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-prjt-wkctmans-popup',
							params : { stor_grp : _global.stor_grp , row_sts : '0',wkct_idcd : wkct_idcd},
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('empy_name'));
								pairField.setValue(records[0].get('empy_idcd'));
							}
						}
					},{	name : 'wker_idcd_1fst', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('cstm_name',' '),
						value		: '',
						width		: 550,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'wker_name_2snd',
						trigger1Cls : _global.hq_id+'searchTrigger',
						pair		: 'wker_idcd_2snd',
						margin		: '0 0 20 0',
						clearable	: false ,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-prjt-wkctmans-popup',
							params : { stor_grp : _global.stor_grp , row_sts : '0',wkct_idcd : wkct_idcd},
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('empy_name'));
								pairField.setValue(records[0].get('empy_idcd'));
							}
						}
					},{	name : 'wker_idcd_2snd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('cstm_name',' '),
						value		: '',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						width		: 550,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						trigger1Cls : _global.hq_id+'searchTrigger',
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'wker_name_3trd',
						pair		: 'wker_idcd_3trd',
						clearable	: false ,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-prjt-wkctmans-popup',
							params : { stor_grp : _global.stor_grp , row_sts : '0',wkct_idcd : wkct_idcd},
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('empy_name'));
								pairField.setValue(records[0].get('empy_idcd'));
							}
						}
					},{	name : 'wker_idcd_3trd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('cstm_name','설비'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'cvic_name',
						pair		: 'cvic_idcd',
						value		: '',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						width		: 550,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						trigger1Cls : _global.hq_id+'searchTrigger',
						popup: {
							select : 'SINGLE',
							widget : 'lookup-prjt-wkctcvic-popup',
							params : { stor_grp : _global.stor_grp , row_sts : '0',wkct_idcd : wkct_idcd},
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('cvic_name'));
								pairField.setValue(records[0].get('cvic_idcd'));
							}
						}
					},{	name : 'cvic_idcd', xtype : 'textfield' , hidden : true
					}
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							var seq;
							Ext.Ajax.request({
								url		: _global.location.http() + '/prod/project/prjtworkentry/get/getSeqn.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										pjod_idcd		: rec.get('pjod_idcd'),
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
										seq = result.records[0].seq+1;
									}
								},
								failure : function(result, request) {
								},
								callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
								}
							});
							var param = Ext.merge( this.up('form').getValues() );
							record = Ext.create( store.model.modelName , {
								pjod_idcd		: rec.get('pjod_idcd'),
								item_idcd		: rec.get('work_item_idcd'),
								line_seqn		: rec.get('line_seqn'),
								wkct_idcd		: rec.get('wkct_idcd'),
								idcd			: rec.get('idcd'),
								work_ordr_dvcd	: rec.get('work_ordr_dvcd'),
								ordr_degr		: rec.get('ordr_degr'),
								invc_date		: param.work_date,
								wker_idcd		: param.wker_idcd_1fst,
								wker_idcd_1fst	: param.wker_idcd_1fst,
								wker_idcd_2snd	: param.wker_idcd_2snd,
								wker_idcd_3trd	: param.wker_idcd_3trd,
								work_sttm		: param.work_sttm+'00',
								cvic_idcd		: param.cvic_idcd,
								line_seqn2		: seq
							});
							store.add(record);
							store.sync({
								callback: function(batch, options) {
									store.reload();
									this.up('form').getForm().reset();
									this.up('window').hide();
								} ,
								scope: this
							},{	synchro : _global.objects.synchro,_set : 'insert'} );
						}
					},
					{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							this.up('form').getForm().reset();
							this.up('window').hide();
						}
					}
				]

			});

			win = Ext.widget('window', {
				title: '<span class="btnTemp" style="font-size:15px; color:black;">시작</span>',
				closeAction: 'hide',
				width: 650,
				height: 550,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: ''
			});
			win.show();
	},
	restart : function (rec) {
		var search = Ext.ComponentQuery.query('module-prjtworkentry-detailSearch')[0],
			wkct_idcd = search.down('[name=wkct_idcd]').getValue(),
			store = this.getStore()
		;
		var	form = Ext.widget('form', {
				border: false,
				bodyPadding: 10,
				fieldDefaults: {
					labelWidth: 200,
					labelStyle: 'text-align:right',
					labelSeparator : '',
				},
				items:[
					{	xtype		: 'label',
						text		: '추가작업하시겠습니까?',
						cls			: 'textTemp',
						style	: 'font-size:4em;'
					},{	fieldLabel	: Language.get('work_date','작업일자'),
						name		: 'work_date',
						xtype		: 'datefield',
						value		: new Date(),
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						hidden		: true
					}
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							var param = Ext.merge( this.up('form').getValues() );
							record = Ext.create( store.model.modelName , {
								pjod_idcd		: rec.get('pjod_idcd'),
								line_seqn		: rec.get('line_seqn'),
								wkct_idcd		: rec.get('wkct_idcd'),
								idcd			: rec.get('idcd'),
								invc_date		: param.work_date,
								work_ordr_dvcd	: rec.get('work_ordr_dvcd'),
								ordr_degr		: rec.get('ordr_degr'),
								line_seqn2		: rec.get('line_seqn2')
							});
							store.add(record);
							store.sync({
								callback: function(batch, options) {
									store.reload();
									this.up('form').getForm().reset();
									this.up('window').hide();
								} ,
								scope: this
							},{	synchro : _global.objects.synchro,_set : 'restart'} );
						}
					},
					{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							this.up('form').getForm().reset();
							this.up('window').hide();
						}
					}
				]

			});

			win = Ext.widget('window', {
				title: '<span class="btnTemp" style="font-size:15px; color:black;">취소</span>',
				closeAction: 'hide',
				width: 500,
				height: 180,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: ''
			});
			win.show();
	},
	cancel : function (rec) {
		var search = Ext.ComponentQuery.query('module-prjtworkentry-detailSearch')[0],
			wkct_idcd = search.down('[name=wkct_idcd]').getValue(),
			store = this.getStore()
		;
		var	form = Ext.widget('form', {
				border: false,
				bodyPadding: 10,
				fieldDefaults: {
					labelWidth: 200,
					labelStyle: 'text-align:right',
					labelSeparator : '',
				},
				items:[
					{	xtype		: 'label',
						text		: '취소하시겠습니까?',
						cls			: 'textTemp',
						style	: 'font-size:4em;'
					},{	fieldLabel	: Language.get('work_date','작업일자'),
						name		: 'work_date',
						xtype		: 'datefield',
						value		: new Date(),
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						hidden		: true
					}
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							var param = Ext.merge( this.up('form').getValues() );
							record = Ext.create( store.model.modelName , {
								pjod_idcd		: rec.get('pjod_idcd'),
								line_seqn		: rec.get('line_seqn'),
								wkct_idcd		: rec.get('wkct_idcd'),
								idcd			: rec.get('idcd'),
								work_ordr_dvcd	: rec.get('work_ordr_dvcd'),
								ordr_degr		: rec.get('ordr_degr'),
								invc_date		: param.work_date,
								work_edtm		: '',
								need_time		: '',
								line_seqn2		: rec.get('line_seqn2')
							});
							store.add(record);
							store.sync({
								callback: function(batch, options) {
									store.reload();
									this.up('form').getForm().reset();
									this.up('window').hide();
								} ,
								scope: this
							},{	synchro : _global.objects.synchro,_set : 'cancel'} );
						}
					},
					{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							this.up('form').getForm().reset();
							this.up('window').hide();
						}
					}
				]
			});
			win = Ext.widget('window', {
				title: '<span class="btnTemp" style="font-size:15px; color:black;">취소</span>',
				closeAction: 'hide',
				width: 500,
				height: 180,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: ''
			});
			win.show();
	},

});
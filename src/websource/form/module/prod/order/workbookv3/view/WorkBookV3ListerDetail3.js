Ext.define('module.prod.order.workbookv3.view.WorkBookV3ListerDetail3', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workbookv3-detail3'			,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.prod.order.workbookv3.store.WorkBookV3Detail3',
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
		me.dockedItems = [{xtype: 'module-workbookv3-detailSearch'}];
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
					{	dataIndex: 'prog_stat_dvcd'	, text : Language.get('prog_stat_dvcd'	,'상태'			) , width	: 110, xtype : 'lookupcolumn', lookupValue : resource.lookup('prog_stat_dvcd'), align : 'center'
					},{ dataIndex: 'wkct_name'		, text : Language.get('wkct_name'		,'공정'			) , width	: 120, align : 'center'
					},{ dataIndex: 'wkod_numb'		, text : Language.get('pdsd_numb'		,'작업지시번호'	) , width	: 200, align : 'center'
//					},{ dataIndex: 'lott_numb'		, text : Language.get('lott_numb'		,'LOT번호'		) , width	: 200, align : 'center'
					},{ dataIndex: 'wkod_seqn'		, text : Language.get('wkod_seqn'		,'지시순번'		) , flex	:   2, align : 'center',hidden:true
					},{ dataIndex: 'work_sttm'		, text : Language.get('work_sttm'		,'시작시간'		) , width	:  90, align : 'center',
					},{ dataIndex: 'work_edtm'		, text : Language.get('work_edtm'		,'종료시간'		) , width	:  90, align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'			) , flex	:   1, minWidth:200
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'			) , flex	:   2, hidden:true
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'		,'지시수량'		) , width	:  85, xtype:'numericcolumn',hidden : true
					},{ dataIndex: 'wker_name'		, text : Language.get('wker_name'		,'작업자'		) , width	: 115
					},{ dataIndex: 'invc_date'		, text : Language.get('work_date'		,'작업일자'		) , flex	:   2, hidden:true
					},{ header: '실행',hidden : true,
						sortable: false,
						width:300,
						align : 'center',
						renderer: function(val,meta,rec) {
							var id     = Ext.id(),
								search = Ext.ComponentQuery.query('module-workbookv3-detailSearch')[0]
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
		var search = Ext.ComponentQuery.query('module-workbookv3-detailSearch')[0],
			store = this.getStore(),
			wkct_idcd = rec.get('wkct_idcd')
		;
		var	form = Ext.widget('form', {
				border: false,
				bodyPadding: 10,
				fieldDefaults: {
					labelWidth: 150,
					labelStyle: 'text-align:right',
					labelSeparator : '',
				},
				items:[
					{	fieldLabel	: Language.get('work_date','작업일자'),
						name		: 'invc_date',
						xtype		: 'datefield',
						value		: new Date(),
						width		: 550,
						readOnly	: true,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						trigger1Cls : _global.hq_id+'dateTrigger',
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						maxValue	: new Date(),
						listeners	:{
						}
					},{	fieldLabel	: Language.get('work_sttm','시작시간'),
						name		: 'work_sttm',
						xtype		: 'timefield',
						format		: 'H:i',
						submitFormat: 'Hi',
						hideTrigger	: true,
						readOnly	: true,
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
					},{	fieldLabel	: Language.get('wker_name','작업자'),
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
						name		: 'wker_name',
						pair		: 'wker_idcd',
						trigger1Cls : _global.hq_id+'searchTrigger',
						clearable	: false ,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-user-popup',
							params : { stor_grp : _global.stor_grp , row_sts : '0'},
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('user_name'));
								pairField.setValue(records[0].get('user_idcd'));
							}
						}
					},{	name : 'wker_idcd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('cvic_name','설비'),
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
							widget : 'lookup-cvic-popup',
							params : { stor_grp : _global.stor_grp , row_sts : '0'},
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
							var param = Ext.merge( this.up('form').getValues() );
							if(param.invc_date==null || param.invc_date ==''){
								Ext.Msg.alert("알림","작업일자를 반드시 입력해주십시오.");
							}else if(param.work_sttm==null || param.work_sttm ==''){
								Ext.Msg.alert("알림","시작시간를 반드시 입력해주십시오.");
							}else if(param.wker_idcd==null || param.wker_idcd ==''){
								Ext.Msg.alert("알림","작업자를 반드시 입력해주십시오.");
							}else if(param.cvic_idcd==null || param.cvic_idcd ==''){
								Ext.Msg.alert("알림","설비를 반드시 입력해주십시오.");
							}else{
								var new_invc_numb;

								Ext.Ajax.request({
									url		: _global.location.http() + '/listener/seq/maxid.do',
									params	: {
										token : _global.token_id,
										param : JSON.stringify({
											stor_id	: _global.stor_id,
											table_nm: 'work_book'
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
											new_invc_numb = result.records[0].seq;
										}
									},
									failure : function(result, request) {
									},
									callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
									}
								});

								var param = Ext.merge( this.up('form').getValues() );
								record = Ext.create( store.model.modelName , {
									invc_numb		: new_invc_numb,
									indn_qntt		: rec.get('indn_qntt'),
									pdsd_numb		: rec.get('pdsd_numb'),
									wkod_numb		: rec.get('wkod_numb'),
									wkod_seqn		: rec.get('wkod_seqn'),
									item_idcd		: rec.get('item_idcd'),
									invc_date		: param.invc_date,
									wker_idcd		: param.wker_idcd,
									work_sttm		: param.work_sttm+'00',
									cvic_idcd		: param.cvic_idcd
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
						}
					},{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
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
				width: 670,
				height: 450,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: ''
			});
			win.show();
	},
	restart : function (rec) {
		var search = Ext.ComponentQuery.query('module-workbookv3-detailSearch')[0],
			cvic_idcd = search.down('[name=cvic_idcd]').getValue(),
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
						style		: 'font-size:4em;'
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
							var new_invc_numb;

							Ext.Ajax.request({
								url		: _global.location.http() + '/listener/seq/maxid.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										stor_id	: _global.stor_id,
										table_nm: 'work_book'
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
										new_invc_numb = result.records[0].seq;
									}
								},
								failure : function(result, request) {
								},
								callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
								}
							});
							record = Ext.create( store.model.modelName , {
								invc_numb		: rec.get('invc_numb'),
								wkod_numb		: rec.get('wkod_numb'),
								wkod_seqn		: rec.get('wkod_seqn'),
								cvic_idcd		: rec.get('cvic_idcd'),
								pdsd_numb		: rec.get('pdsd_numb'),
								work_sttm		: rec.get('work_sttm'),
								invc_date		: param.invc_date
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
		var search = Ext.ComponentQuery.query('module-workbookv3-detailSearch')[0],
			cvic_idcd = search.down('[name=cvic_idcd]').getValue(),
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
								invc_numb		: rec.get('invc_numb'),
								wkod_numb		: rec.get('wkod_numb'),
								wkod_seqn		: rec.get('wkod_seqn'),
								cvic_idcd		: rec.get('cvic_idcd'),
								pdsd_numb		: rec.get('pdsd_numb'),
								work_sttm		: rec.get('work_sttm'),
								invc_date		: param.invc_date,
								work_edtm		: '',
								need_time		: ''
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
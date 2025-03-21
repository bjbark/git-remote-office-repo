Ext.define('module.custom.kortc.prod.workentry.view.WorkEntryListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-kortc-workentry-detail'			,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	store		: 'module.custom.kortc.prod.workentry.store.WorkEntryDetail',
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

		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					{	text : '<span class="btnTemp" style="font-size:1.5em;">생산삭제</span>', cls : 'btn btn-danger ' , width: 100, height : 35, margin: '0 0 0 5' , handler:me.deleted
					},{	text : '<span class="btnTemp" style="font-size:2.5em;">일마감</span>'    , cls : 'button-left btn btn-info'    , width: 150, height : 50, margin: '0 0 0 5', hidden : true
					},
					'->','-',
					{	text : '<span class="btnTemp" style="font-size:2.5em;">불량/유실보고</span>'  ,
						cls  : 'button-left btn btn-primary' ,
						width: 210,
						height : 50,
						margin : '0 0 0 5',
						handler:  function() {
							var detail    = Ext.ComponentQuery.query('module-kortc-workentry-detail')[0],
								master    = Ext.ComponentQuery.query('module-kortc-workentry-lister')[0],
								select    = detail.getSelectionModel().getSelection()[0]
							;
							if(!select){
								Ext.Msg.alert("알림","제품정보를 조회할 목록을 선택하여주십시오.");
							}else{
								me.iteminfo(select);
							}
						}
					},
					{	text : '<span class="btnTemp" style="font-size:2.5em;">교대/마감</span>', cls : 'button-left btn btn-success' , width: 190, height : 50, margin: '0 0 0 5' , handler:me.shiftWork
					},

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
					{	dataIndex: 'prog_stat_dvcd'	, text : Language.get(''				,'상태'		) , width : 70	, xtype  : 'lookupcolumn'	, lookupValue : resource.lookup('prog_stat_dvcd'), align : 'center'
					},{ dataIndex: 'wkod_numb'		, text : Language.get(''				,'지시번호'	) , width : 160	, align  : 'center'
					},{ dataIndex: 'invc_date'		, text : Language.get(''				,'작업일자'	) , width : 120	, align  : 'center'
					},{ dataIndex: 'work_strt_dttm'	, text : Language.get(''				,'시작일시'	) , width : 165	, align  : 'center'
					},{ dataIndex: 'wker_name'		, text : Language.get(''				,'작업자'	) , width : 120	, align  : 'left'
					},{ dataIndex: 'cstm_name'		, text : Language.get(''				,'거래처명'	) , width : 160	, align  : 'left'
					},{ dataIndex: 'acpt_numb'		, text : Language.get(''				,'수주번호'	) , width : 140	, align  : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		) , flex  : 1   , minWidth : 200
					},{ dataIndex: 'item_spec'		, text : Language.get(''				,'규격'		) , width : 140	, align  : 'left'
					},{ dataIndex: 'modl_name'		, text : Language.get(''				,'모델명'	) , width : 140	, align  : 'left'
					},{ dataIndex: 'indn_qntt'		, text : Language.get(''				,'지시수량'	) , width : 80	, xtype  : 'numericcolumn'
					},{ header: '실행',
						width : 190,
						sortable: false,
						align : 'center',
						renderer: function(val,meta,rec,a,b,c) {
							var id = Ext.id();
							Ext.defer(function() {
									Ext.widget('button', {
										width:90,
										height: 40,
										margin: "0 10px 0 0",
										renderTo: Ext.query("#"+id)[0],
										text: '<span class="btnTemp" style="font-size:1.3em;font-weight: bold;">일시정지</span>',
										cls:'btn btn-warning btnTemp '+_global.hq_id+'button',
										handler:  function(){me.stop(rec)},
									});
									Ext.widget('button', {
										width:80,
										height: 40,
										margin: "0 10px 0 0",
										renderTo: Ext.query("#"+id)[0],
										text: '<span class="btnTemp" style="font-size:2em;font-weight: bold;">종료<span>',
										cls:'btn btn-danger btnTemp '+_global.hq_id+'button',
										handler:  function(){me.end(rec)},
									});
//									Ext.widget('button', {
//										width:100,
//										height: 40,
//										renderTo: Ext.query("#"+id)[0],
//										text: '<span class="btnTemp" style="font-size:2em;font-weight: bold;">삭제</span>',
//										cls:'btn btn-primary btnTemp '+_global.hq_id+'button',
//										handler:  function(){me.deleted(rec)},
//									});
							}, 50);
							return Ext.String.format('<div id="{0}"></div>', id);
						},
						dataIndex: 'somefieldofyourstore'
					}
				]
			}
		;
		return item;
	},
	//TODO 중단
	stop : function (rec) {
		var search = Ext.ComponentQuery.query('module-kortc-workentry-search')[0],
			searchDate = search.down('[name=work_date]').getValue(),
			store = Ext.ComponentQuery.query('module-kortc-workentry-lister')[0].getStore(),
			store2 = Ext.ComponentQuery.query('module-kortc-workentry-detail')[0].getStore(),
			prod_qntt = '';
		;
		prod_qntt = rec.get('prod_qntt');
		var	form = Ext.widget('form', {
			border: false,
			itemId: 'stop',
			bodyPadding: 10,
			fieldDefaults: {
				labelWidth: 130,
				labelStyle: 'text-align:right',
				labelSeparator : '',
			},
			items:[
				{	fieldLabel	: Language.get('work_endd_date','정지일자'),
					name		: 'work_endd_date',
					xtype		: 'datefield',
					width		: 435,
					height		: 50,
					labelStyle	: 'line-height: 75px;',
					labelCls	: 'textTemp '+_global.hq_id+'label',
					fieldCls	: 'textTemp '+_global.hq_id+'field readonlyfield',
					cls			: 'textTemp',
					maxValue	: new Date(),
					trigger1Cls : _global.hq_id+'dateTrigger',
					format		: Const.DATE_FORMAT_YMD_BAR,
					submitFormat: Const.DATE_FORMAT_YMD,
					value		: searchDate,
					readOnly	: true
				},{	fieldLabel	: Language.get('work_edtm','정지시간'),
					name		: 'work_edtm',
					xtype		: 'timefield',
					format		: 'H:i',
					submitFormat: 'Hi',
					hideTrigger	: true,
					value		: new Date(),
					readOnly	: true,
					minValue	: '00:00 AM',
					maxValue	: '23:59 PM',
					width		: 435,
					height		: 50,
					labelStyle	: 'line-height: 75px;',
					labelCls	: 'textTemp '+_global.hq_id+'label',
					fieldCls	: 'textTemp '+_global.hq_id+'field readonlyfield',
					cls			: 'textTemp',
					listConfig:{
						itemCls		: _global.hq_id+'item'											// lookup list에 클래스 추가
					},
				},{	fieldLabel	: Language.get('prod_qntt','생산수량'),
					name		: 'prod_qntt',
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					hideTrigger	: true,
					readOnly	: false,
					width		: 435,
					height		: 50,
					labelStyle	: 'line-height: 75px;',
					labelCls	: 'textTemp '+_global.hq_id+'label',
					fieldCls	: 'textTemp '+_global.hq_id+'field',
					cls			: 'textTemp',
					handleMouseEvents:true,
					value		: prod_qntt,
					listeners:{
						render:function(field ){
							field.getEl().on('click', function( event, el ) {
								var trigger1 = Ext.dom.Query.select('.trigger1')[0];
								Ext.get(trigger1).dom.click();
							});
						}
					},
					popup: {
						select	: 'SINGLE',
						widget	: 'lookup-keypad-popup',
						params	: { stor_grp : _global.stor_grp},
						result	: function(records, nameField, pairField){
							nameField.setValue(records[0].result);
						}
					},
					trigger1Cls : 'hideCls trigger1',
				},{	fieldLabel	: Language.get('dsct_resn_dvcd', '중단사유'),
					labelCls	: 'textTemp '+_global.hq_id+'label',												// label에 클래스추가
					fieldCls	: 'textTemp '+_global.hq_id+'field',												// field에 클래스추가
					xtype		: 'lookupfield',
					name		: 'dsct_resn_dvcd',
					trigger1Cls : _global.hq_id+'trigger',											// trigger(버튼)에 클래스 추가
					width		: 450,
					lookupValue	: resource.lookup('dsct_resn_dvcd'),
					height		: 50,
					margin		: '10 0 0 0',
					multiSelect	: false ,
					editable	: false,
					hidden		: true,
					listConfig:{
						itemCls		: _global.hq_id+'item'											// lookup list에 클래스 추가
					},
				},{ xtype		: 'datefield',
					name		: 'invc_date',
					hidden		: true,
					format		: Const.DATE_FORMAT_YMD_BAR,
					submitFormat: Const.DATE_FORMAT_YMD,
					value		: rec.get('invc_date')
				}
			],
			buttons: [
				{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
					cls: 'button-style',
					flex:1,
					height:50,
					handler: function() {
						var param = Ext.merge( this.up('form').getValues() );
							sttm_temp2 = rec.get('work_strt_dttm').replace(/-/gi,""),
							sttm_temp1 = sttm_temp2.replace(/:/gi,""),
							sttm_temp  = sttm_temp1.replace(/\s/gi, ""),
							sttm_hour = sttm_temp.substring('8','10');
							edtm_hour = param.work_edtm.substring('0','2');
							sttm_min = sttm_temp.substring('10','12');
							edtm_min = param.work_edtm.substring('2','4');
						var time  = edtm_hour-sttm_hour;
						var min   = edtm_min-sttm_min;
						if(min < 0){
							time = edtm_hour-sttm_hour-1;
							min  = edtm_min-sttm_min + 60;
						}
						var total = (time*60)+min;
						if(param.prod_qntt < 0 ||param.prod_qntt == ''){
							Ext.Msg.alert("알림","생산수량을 입력해주세요.");
							return;
						}else{
							record = Ext.create( store.model.modelName , {
								invc_numb		: rec.get('invc_numb'),
								wkod_numb		: rec.get('wkod_numb'),
								wkod_seqn		: rec.get('wkod_seqn'),
								cvic_idcd		: rec.get('cvic_idcd'),
								pdsd_numb		: rec.get('pdsd_numb'),
								work_sttm		: rec.get('work_sttm'),
								invc_date		: rec.get('invc_date'),
								work_edtm		: param.work_edtm+'00',
								prod_qntt		: param.prod_qntt,
								dsct_resn_dvcd	: param.dsct_resn_dvcd,
								need_time		: total,
								work_endd_date	: param.work_endd_date,
								sysm_memo		: rec.get('sysm_memo')
							});
							store.add(record);
							store.sync({
								callback: function(batch, options) {
									store.reload();
									store2.reload();
									this.up('form').getForm().reset();
									this.up('window').destroy();
//									this.up('window').hide();
								} ,
								scope: this
							},{	synchro : _global.objects.synchro,_set : 'stop'} );
						}
					}
				},
				{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
					cls: 'button-style',
					flex:1,
					height:50,
					handler: function() {
						this.up('form').getForm().reset();
						Ext.ComponentQuery.query('#stop')[0].up('window').destroy();
					}
				}
			]

		});

		win = Ext.widget('window', {
			title: '<span class="btnTemp" style="font-size:15px; color:black;">일시정지</span>',
			closeAction: 'destory',
			width: 559,
			height: 370,
			layout: 'fit',
			resizable: true,
			modal: true,
			items: form,
			defaultFocus: ''
		});
		win.show();
		win.tools.close.hide ();  // 닫기버튼 hide
	},
	//TODO 종료
	end : function (rec) {
		var search = Ext.ComponentQuery.query('module-kortc-workentry-search')[0],
			searchDate = search.down('[name=work_date]').getValue(),
			store = Ext.ComponentQuery.query('module-kortc-workentry-detail')[0].getStore(),
			store2 = Ext.ComponentQuery.query('module-kortc-workentry-detail2')[0].getStore(),
			prod_qntt = '';
		;

		prod_qntt = rec.get('prod_qntt');
		var	form = Ext.widget('form', {
			border: false,
			bodyPadding: 10,
			itemId : 'end',
			fieldDefaults: {
				labelWidth: 130,
				labelStyle: 'text-align:right',
				labelSeparator : '',
			},
			items:[
				{	fieldLabel	: Language.get('work_endd_date','종료일자'),
					name		: 'work_endd_date',
					xtype		: 'datefield',
					width		: 435,
					height		: 50,
					readOnly	: true,
					labelStyle	: 'line-height: 75px;',
					labelCls	: 'textTemp '+_global.hq_id+'label',
					fieldCls	: 'textTemp '+_global.hq_id+'field readonlyfield',
					cls			: 'textTemp',
					trigger1Cls : _global.hq_id+'dateTrigger',
					format		: Const.DATE_FORMAT_YMD_BAR,
					submitFormat: Const.DATE_FORMAT_YMD,
					value		: new Date(),
					maxValue	: new Date(),
				},{	fieldLabel	: Language.get('work_edtm','종료시간'),
					name		: 'work_edtm',
					xtype		: 'timefield',
					format		: 'H:i',
					submitFormat: 'Hi',
					hideTrigger	: true,
					value		: new Date(),
					minValue	: '00:00 AM',
					maxValue	: '23:59 PM',
					readOnly	: true,
					width		: 435,
					height		: 50,
					labelStyle	: 'line-height: 75px;',
					labelCls	: 'textTemp '+_global.hq_id+'label',
					fieldCls	: 'textTemp '+_global.hq_id+'field readonlyfield',
					cls			: 'textTemp'
				},{	fieldLabel	: Language.get('prod_qntt','생산수량'),
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					name		: 'prod_qntt',
					labelCls	: 'textTemp '+_global.hq_id+'label',
					fieldCls	: 'textTemp '+_global.hq_id+'field',
					cls			: 'textTemp',
					width		: 452,
					height		: 50,
					labelStyle	: 'line-height: 75px;',
					trigger1Cls : _global.hq_id+'searchTrigger',
					labelCls	: 'textTemp '+_global.hq_id+'label',
					fieldCls	: 'textTemp '+_global.hq_id+'field',
					cls			: 'textTemp',
					value		: prod_qntt,
					handleMouseEvents:true,
					listeners:{
						render:function(field ){
							field.getEl().on('click', function( event, el ) {
								var trigger1 = Ext.dom.Query.select('.trigger1')[0];
								Ext.get(trigger1).dom.click();
							});
						}
					},
					popup: {
						select	: 'SINGLE',
						widget	: 'lookup-keypad-popup',
						params	: { stor_grp : _global.stor_grp},
						result	: function(records, nameField, pairField){
							nameField.setValue(records[0].result);
						}
					},
					trigger1Cls : 'hideCls trigger1',
				},{ xtype		: 'datefield',
					name		: 'invc_date',
					hidden		: true,
					format		: Const.DATE_FORMAT_YMD_BAR,
					submitFormat: Const.DATE_FORMAT_YMD,
					value		: rec.get('invc_date')
				}
			],
			buttons: [
				{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
					cls: 'button-style',
					flex:1,
					height:50,
					handler: function() {
						var param = Ext.merge( this.up('form').getValues() );
							sttm_temp2 = rec.get('work_strt_dttm').replace(/-/gi,""),
							sttm_temp1 = sttm_temp2.replace(/:/gi,""),
							sttm_temp  = sttm_temp1.replace(/\s/gi, ""),
							sttm_hour = sttm_temp.substring('8','10');
							edtm_hour = param.work_edtm.substring('0','2');
							sttm_min = sttm_temp.substring('10','12');
							edtm_min = param.work_edtm.substring('2','4');
						if(param.prod_qntt==null||param.prod_qntt==''){
							Ext.Msg.alert("알림","생산수량을 반드시 입력해주십시오.");
						}else{
							var time  = edtm_hour-sttm_hour;
							var min   = edtm_min-sttm_min;
							if(min < 0){
								time = edtm_hour-sttm_hour-1;
								min  = edtm_min-sttm_min + 60;
							}
							var total = (time*60)+min;
							var work_edtm = param.work_edtm+'00';
							if(param.prod_qntt < 1 ||param.prod_qntt == ''){
								Ext.Msg.alert("알림","생산수량을 입력해주세요.");
								return;
							}else{
								record = Ext.create( store.model.modelName , {
									invc_numb		: rec.get('invc_numb'),
									wkod_numb		: rec.get('wkod_numb'),
									wkod_seqn		: rec.get('wkod_seqn'),
									pdsd_numb		: rec.get('pdsd_numb'),
									cvic_idcd		: rec.get('cvic_idcd'),
									work_sttm		: rec.get('work_sttm'),
									work_edtm		: param.work_edtm,
									prod_qntt		: param.prod_qntt,
									invc_date		: rec.get('invc_date'),
									work_endd_date	: param.work_endd_date,
									need_time		: total,
									sysm_memo		: rec.get('sysm_memo')
								});
								store.add(record);
								store.sync({
									callback: function(batch, options) {
										store.reload();
										store2.reload();
										this.up('form').getForm().reset();
										this.up('window').destroy();
//										this.up('window').hide();
									} ,
									scope: this
								},{	synchro : _global.objects.synchro,_set : 'end'} );
							}
						}
					}
				},{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
					cls: 'button-style',
					flex:1,
					height:50,
					handler: function() {
						this.up('form').getForm().reset();

						Ext.ComponentQuery.query('#end')[0].up('window').destroy();
					}
				}
			]

		});

		win = Ext.widget('window', {
			title: '<span class="btnTemp" style="font-size:15px; color:black;">종료</span>',
			closeAction: 'destroy',
			width: 559,
			height: 360,
			layout: 'fit',
			resizable: true,
			modal: true,
			items: form,
			defaultFocus: ''
		});
		win.show();
		win.tools.close.hide ();  // 닫기버튼 hide
	},
	//TODO 삭제
	deleted : function () {
		var search = Ext.ComponentQuery.query('module-kortc-workentry-search')[0],
			searchDate = search.down('[name=work_date]').getValue(),
			wkct_idcd = search.down('[name=wkct_idcd]').getValue(),
			store = Ext.ComponentQuery.query('module-kortc-workentry-detail2')[0].getStore(),
			store2 = Ext.ComponentQuery.query('module-kortc-workentry-detail')[0].getStore(),
			store3 = Ext.ComponentQuery.query('module-kortc-workentry-lister')[0].getStore(),
			detail = Ext.ComponentQuery.query('module-kortc-workentry-detail')[0],
			rec = detail.getSelectionModel().getSelection()[0],
			length = detail.getSelectionModel().getSelection().length
		;
		if(rec){
			if(length > 1){
				Ext.Msg.alert("알림","삭제하려는 작업내역을 하나만 선택해주십시오.");
				return;
			}
			var	form = Ext.widget('form', {
				border: false,
				bodyPadding: 10,
				itemId:'delete',
				fieldDefaults: {
					labelWidth: 200,
					labelStyle: 'text-align:right',
					labelSeparator : '',
				},
				layout:'vbox',
				items:[
					{	xtype		: 'label',
						text		: '현재 생산 진행중인 데이터가 삭제되며, 복구할수 없습니다.',
						cls			: 'textTemp',
						style	: 'font-size:2em;'
					},{	xtype		: 'label',
						text		: '삭제하시면 대기로 돌아갑니다.',
						cls			: 'textTemp',
						style	: 'font-size:2em;'
					},{	xtype		: 'label',
						text		: '정말로 삭제하시겠습니까?',
						cls			: 'textTemp',
						style	: 'font-size:2em;'
					},{	fieldLabel	: Language.get('invc_date','작업일자'),
						name		: 'invc_date',
						xtype		: 'datefield',
						value		: new Date(),
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						maxValue	: new Date(),
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
							Ext.Ajax.request({
								url			: _global.api_host_info + '/' + _global.app_site + '/custom/kortc/prod/workentry/set/setDelete.do',
								method		: "POST",
								params		: {
									token	: _global.token_id,
									param	: Ext.encode({
										invc_numb		: rec.get('invc_numb'),
										wkod_numb		: rec.get('wkod_numb'),
										wkod_seqn		: rec.get('wkod_seqn'),
									})
								},
								success : function(response, request) {
									var object = response,
										result = Ext.decode(object.responseText)
									;
									store3.reload();
									store2.reload();
									Ext.ComponentQuery.query('#delete')[0].up('window').destroy();
								},
								failure : function(response, request) {
									resource.httpError(response);
								},
								callback : function() {
								}
							});
						}
					},
					{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							this.up('form').getForm().reset();
							Ext.ComponentQuery.query('#delete')[0].up('window').destroy();
						}
					}
				]

			});

			win = Ext.widget('window', {
				title: '<span class="btnTemp" style="font-size:15px; color:black;">삭제</span>',
				closeAction: 'destroy',
				width: 600,
				height: 220,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: ''
			});
			win.show();
			win.tools.close.hide ();  // 닫기버튼 hide
		}else{
			Ext.Msg.alert("알림","삭제하려는 작업내역을 선택해주십시오.");
		}
	},
	//TODO 불량내역
	poor : function (rec) {
		var search     = Ext.ComponentQuery.query('module-kortc-workentry-search')[0],
			store      = Ext.ComponentQuery.query('module-kortc-workentry-lister')[0].getStore(),
			store2     = Ext.ComponentQuery.query('module-kortc-workentry-detail')[0].getStore(),
			poorLookup = new Array(),
			me         = this
		;
		var form = Ext.widget('form', {
			border         : false,
			itemId         : 'poor',
			bodyPadding    : 10,
			fieldDefaults  : {
				labelWidth     : 150,
				labelStyle     : 'text-align:right',
				labelSeparator : '',
			},
			items:[
				{	xtype		: 'label',
					text		:'불량유형과 수량을 입력하여 주십시오.',
					style		: {
						fontSize: '20px',
						color	: 'darkblue'
					},
					cls			: 'textTemp',
					margin		: '0 0 0 230'
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 20',
					items	: [
						{	fieldLabel	: Language.get('poor_name', '불량유형'),
							labelCls	: 'textTemp '+_global.hq_id+'label',												// label에 클래스추가
							fieldCls	: 'textTemp '+_global.hq_id+'field readonlyfield',												// field에 클래스추가
							xtype		: 'textfield',
							name		: 'poor_name',
							width		: 320,
							height		: 50,
							readOnly	: true,
							labelWidth	: 130,
							margin		: '20 0 0 0'
						},{ xtype:'textfield', name : 'poor_bacd',hidden:true
						},{	fieldLabel	: Language.get('poor_qntt', '수량'),
							labelCls	: 'textTemp '+_global.hq_id+'label',												// label에 클래스추가
							fieldCls	: 'textTemp '+_global.hq_id+'field',												// field에 클래스추가
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'poor_qntt',
							width		: 320,
							height		: 50,
							labelWidth	: 130,
							margin		: '20 0 0 0',
							trigger1Cls : 'hideCls kortcTrigger1',
							handleMouseEvents:true,
							listeners:{
								render:function(field ){
									field.getEl().on('click', function( event, el ) {
										var trigger1 = Ext.dom.Query.select('.kortcTrigger1')[0];

										Ext.get(trigger1).dom.click();
									});
								}
							},
							popup: {
								select	: 'SINGLE',
								widget	: 'lookup-keypad-popup',
								params	: { stor_grp : _global.stor_grp},
								result	: function(records, nameField, pairField){
									nameField.setValue(records[0].result);
								}
							},
						}
					]
				},
			],
			buttons: [
				{	text	: '<span class="btnTemp" style="font-size:3em">확인</span>',
					cls		: 'button-style',
					flex	: 1,
					height	:50,
					handler	: function() {
						var form		= this.up('form'),
							poor_bacd	= form.down('[name=poor_bacd]'),
							poor_name	= form.down('[name=poor_name]')
						;
						if(poor_bacd.getValue()){
							me.poorupdate(form.getValues());
						}else{
							return;
						}

//						this.up('form').getForm().reset();
						win.destroy();
					}
				},{	text	: '<span class="btnTemp" style="font-size:3em">취소</span>',
					cls		: 'button-style',
					flex	: 1,
					height	:50,
					handler	: function() {
						this.up('form').getForm().reset();
//						this.up('window').destroy();
						win.destroy();
					}
				}
			]
		});
		var array;
		Ext.Ajax.request({
			url			: _global.api_host_info + '/' + _global.app_site + '/basic/basemast/get/search2.do',
			method		: "POST",
			async: false,
			params		: {
				token	: _global.token_id,
				param	: Ext.encode({
					prnt_idcd	: "6000",
					hqof_idcd	: _global.hqof_idcd,
					stor_grp	: _global.stor_grp
				})
			},
			success : function(response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				if(result.records.length){
					array = result.records;
				}
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});
		var point = 4;
		for (var i = 0; i < array.length; i++) {
			form.insert(point,{	xtype   : 'button',
				text    : '<span class="btnTemp" style="font-size:2em;color:white;">'+array[i].base_name+'</span>',
				cls     : 'poorbutton-style',
				itemId	: i,
				width   : 150,
				height  : 50,
				margin  :'30 0 0 30',
				listeners :{
					click : function(){
						var form		= this.up('form'),
							poor_bacd	= form.down('[name=poor_bacd]'),
							poor_name	= form.down('[name=poor_name]')
						;
						poor_bacd.setValue(array[this.itemId].base_code);
						poor_name.setValue(array[this.itemId].base_name);
					}
				}
			});
			point++;
		}
		win = Ext.widget('window', {
			title		: '<span class="btnTemp" style="font-size:16px; color:black;">불량보고</span>',
			closeAction	: '',
			width		: 780,
			height		: 620,
			layout		: 'fit',
			resizable	: true,
			modal		: true,
			items		: form,
			defaultFocus: ''
		});
		win.show();
		win.tools.close.hide ();  // 닫기버튼 hide
	},
	//TODO 유실보고
	fail : function (rec) {
		var search     = Ext.ComponentQuery.query('module-kortc-workentry-search')[0],
			store      = Ext.ComponentQuery.query('module-kortc-workentry-lister')[0].getStore(),
			store2     = Ext.ComponentQuery.query('module-kortc-workentry-detail')[0].getStore(),
			me         = this
		;
		var form = Ext.widget('form', {
			border         : false,
			itemId         : 'fail',
			bodyPadding    : 10,
			fieldDefaults  : {
				labelWidth : 150,
				labelStyle : 'text-align:right',
				labelSeparator : '',
			},
			items:[
				{	xtype		: 'label',
					text		:'유실유형과 시간을 선택하여 주십시오.',
					style		: {
						fontSize: '20px',
						color	: 'darkblue'
					},
					cls			: 'textTemp',
					margin		: '0 0 10 110'
				},{	fieldLabel	: Language.get('loss_resn_name', '유실유형'),
					labelCls	: 'textTemp '+_global.hq_id+'label',												// label에 클래스추가
					fieldCls	: 'textTemp '+_global.hq_id+'field readonlyfield',												// field에 클래스추가
					xtype		: 'textfield',
					name		: 'loss_resn_name',
					width		: 413,
					height		: 50,
					maxWidth	: 500,
					readOnly	: true,
					labelWidth	: 210,
					margin		: '20 0 0 0'
				},{ xtype:'textfield', name : 'loss_resn_dvcd',hidden:true
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0',
					items	: [
						{	fieldLabel	: Language.get('sttm','시간'),
							name		: 'sttm',
							xtype		: 'timefield',
							format		: 'H:i',
							labelWidth	: 60,
							submitFormat: 'Hi',
							value		: new Date(),
							minValue	: '00:00 AM',
							maxValue	: '23:59 PM',
							margin		: '0 0 0 70',
							readOnly	: false,
							width		: 180,
							height		: 50,
							labelStyle	: 'line-height: 45px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'popupfield', editable : true,
							trigger1Cls : _global.hq_id+'trigger',											// trigger(버튼)에 클래스 추가
							listConfig:{
								itemCls		: _global.hq_id+'item'											// lookup list에 클래스 추가
							},
							cls			: 'textTemp'
						},{	fieldLabel	: Language.get('','~'),
							name		: 'edtm',
							xtype		: 'timefield',
							format		: 'H:i',
							submitFormat: 'Hi',
							margin		: '0 0 0 10',
							labelWidth	: 15,
							value		: '',
							minValue	: '00:00 AM',
							maxValue	: '23:59 PM',
							readOnly	: false,
							margin		: '0 0 0 50',
							width		: 135,
							height		: 50,
							labelStyle	: 'line-height: 45px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'popupfield', editable : true,
							trigger1Cls : _global.hq_id+'trigger',											// trigger(버튼)에 클래스 추가
							listConfig:{
								itemCls		: _global.hq_id+'item'											// lookup list에 클래스 추가
							},
							cls			: 'textTemp'
						}
					]
				}
			],
			buttons: [
				{	text	: '<span class="btnTemp" style="font-size:3em">확인</span>',
					cls		: 'button-style',
					flex	: 1,
					height	:50,
					handler	: function() {
						var form			= this.up('form'),
							loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]'),
							loss_resn_name	= form.down('[name=loss_resn_name]')
						;
						if(loss_resn_dvcd){
							me.failupdate(form.getValues());
						}else{
							return;
						}
//						form.getForm().reset();
						win.destroy();
					}
				},{	text	: '<span class="btnTemp" style="font-size:3em">취소</span>',
					cls		: 'button-style',
					flex	: 1,
					height	:50,
					handler	: function() {
						this.up('form').getForm().reset();
						win.destroy();
//						Ext.ComponentQuery.query('#fail')[0].up('window').destroy();
					}
				}
			]
		});
		var array2;
		Ext.Ajax.request({
			url			: _global.api_host_info + '/' + _global.app_site + '/basic/basemast/get/search2.do',
			method		: "POST",
			async: false,
			params		: {
				token	: _global.token_id,
				param	: Ext.encode({
					prnt_idcd	: "6100",
					hqof_idcd	: _global.hqof_idcd,
					stor_grp	: _global.stor_grp
				})
			},
			success : function(response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				if(result.records.length){
					array2 = result.records;
				}
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});
		var point2 = 4;
		for (var i = 0; i < array2.length; i++) {
			form.insert(point2,						//위치
				{	xtype	: 'button',
					text    : '<span class="btnTemp" style="font-size:2em;color:white;">'+array2[i].base_name+'</span>',
					itemId	: i,
					listeners :{
						click : function(){
							var form			= this.up('form'),
								loss_resn_name	= form.down('[name=loss_resn_name]'),
								loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
							;
							loss_resn_dvcd.setValue(array2[this.itemId].base_code);
							loss_resn_name.setValue(array2[this.itemId].base_name);
						}
					},
					cls     : 'failbutton-style',
					width   : 150,
					height  : 50,
					margin  :'30 0 0 30'
				}
			);
			point2++;
		}
		win = Ext.widget('window', {
			title		: '<span class="btnTemp" style="font-size:16px; color:black;">유실보고</span>',
			closeAction	: 'destory',
			width		: 586,
			height		: 610,
			layout		: 'fit',
			resizable	: true,
			modal		: true,
			items		: form,
			defaultFocus: ''
		});
		win.show();
		win.tools.close.hide ();  // 닫기버튼 hide
	},
	//TODO 불량 업로드 function
	poorupdate : function (param) {
		var me = this,
			poor_qntt = param.poor_qntt,
			poor_bacd = param.poor_bacd,
			detail    = Ext.ComponentQuery.query('module-kortc-workentry-detail')[0],
			poor      = Ext.ComponentQuery.query('module-kortc-workentry-poor')[0],
			select    = detail.getSelectionModel().getSelection()[0],
			line_seqn = 0,
			sttm1      = select.get('work_sttm'),
			edtm1      = select.get('work_edtm'),
			sttm       = null,
			edtm       = ''
		;
		if(poor_bacd==''||poor_bacd==null){
			Ext.Msg.alert("알림","불량유형을 반드시 선택하여 주십시오.");
		}
		if(poor_qntt==0||poor_qntt==''||poor_qntt==null){
			Ext.Msg.alert("알림","불량수량을 반드시 입력하여 주십시오.");
		}else{
			if(sttm1!=null||sttm1!=undefined){
				sttm = sttm1.replace(':','');
			}
			if(edtm1!=null||edtm1!=undefined){
				edtm = edtm1.replace(':','');
			}
			//line_seqn count
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/kortc/prod/workentry/get/poorseqn.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						invc_numb		: select.get('invc_numb')
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						return;
					} else {
					}
					line_seqn = result.records[0].line_seqn;
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
			line_seqn= line_seqn+1;

			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/kortc/prod/workentry/set/poor.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						_set			: 'insert',
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						invc_numb		: select.get('invc_numb'),
						line_seqn		: line_seqn,
						invc_date		: select.get('invc_date'),
						poor_bacd		: poor_bacd,
						sttm			: sttm,
						edtm			: edtm,
						wker_idcd		: select.get('wker_idcd'),
						good_qntt		: null,
						poor_qntt		: poor_qntt,
						loss_qntt		: null,
						runn_dsct_yorn	: null
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						return;
					} else {
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					Ext.ComponentQuery.query('#poor')[0].up('window').destroy();
					poor.getStore().reload();
				}
			});
		}
	},
	//TODO 유실보고 업로드 function
	failupdate : function (param) {
		var me = this,
			sttm1     = param.sttm,
			edtm1     = param.edtm,
			loss_resn_dvcd     = param.loss_resn_dvcd,
			sttm      = sttm1.replace(':',''),
			edtm      = '',
			detail    = Ext.ComponentQuery.query('module-kortc-workentry-detail')[0],
			fail      = Ext.ComponentQuery.query('module-kortc-workentry-fail')[0],
			select    = detail.getSelectionModel().getSelection()[0],
			line_seqn = 0,
			loss_time = 0,
			sttm_hour = sttm.substring(0,2),
			sttm_min  = sttm.substring(2,4),
			edtm_hour  = '';
			edtm_min  = '',
			time = 0,
			min  = 0
		;
		if(edtm1){
			edtm		= edtm1.replace(':','')+"00";
			edtm_hour	= edtm.substring(0,2);
			edtm_min	= edtm.substring(2,4)
			time		= edtm_hour-sttm_hour;
			min			= edtm_min-sttm_min
		}
		if(loss_resn_dvcd==null||loss_resn_dvcd==''){
			Ext.Msg.alert("알림","유실유형을 선택하여주십시오.");
			return;
		}
		if(min < 0){
			time = time-1;
			min  = min + 60;
		}
		if(time < 0){
			time = time+24;
		}
		var total = (time*60)+min;
		//line_seqn count
		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/kortc/prod/workentry/get/failseqn.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
					invc_numb		: select.get('invc_numb')
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					return;
				} else {
				}
				line_seqn = result.records[0].line_seqn;
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		line_seqn= line_seqn+1;

		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/kortc/prod/workentry/set/fail.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					_set			: 'insert',
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
					invc_numb		: select.get('invc_numb'),
					line_seqn		: line_seqn,
					invc_date		: select.get('invc_date'),
					cvic_idcd		: select.get('cvic_idcd'),
					loss_resn_dvcd	: loss_resn_dvcd,
					sttm			: sttm+'00',
					edtm			: edtm,
					loss_time		: total,
					loss_pcnt		: 0,
					loss_mnhr		: 0,
					work_dsct_yorn	: 0,
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					return;
				} else {
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				Ext.ComponentQuery.query('#fail')[0].up('window').destroy();
				fail.getStore().reload();
			}
		});
	},
//TODO 품목정보
	iteminfo : function (select) {
		var search     = Ext.ComponentQuery.query('module-kortc-workentry-search')[0],
			poor       = Ext.ComponentQuery.query('module-kortc-workentry-poor')[0],
			store      = Ext.ComponentQuery.query('module-kortc-workentry-lister')[0].getStore(),
			store2     = Ext.ComponentQuery.query('module-kortc-workentry-detail')[0].getStore(),
			me         = this,
			shot       = 0
		;
		Ext.Ajax.request({
			url			: _global.location.http() + '/custom/kortc/prod/workentry/get/realshot.do',
			method		: "POST",
			async		: false,
			params		: {
				token	: _global.token_id,
				param	: Ext.encode({
					invc_numb		: select.get('invc_numb'),
				})
			},
			success : function(response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				shot = result.records[0].shot_cont;
			},
			failure : function(response, request) {
			},
			callback : function() {
			}
		});
		var form = Ext.widget('form', {
			border         : false,
			itemId         : 'info',
			layout         : 'border',
			bodyPadding    : 5,
			fieldDefaults  : {
				labelWidth : 150,
				labelStyle : 'text-align:right',
				labelSeparator : '',
			},
			items:[
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0', region:'north',
					items	: [
						{	xtype		: 'image',
							name		: 'image',
							id			: 'image',
							src			: '',
							width		: 207,
							height		: 310,
							margin		: '10 0 5 18',
							hidden		: false,
						},{	xtype		:'textfield',
							name		: 'item_imge',
							hidden		: true,
							value		: select.get('item_imge'),
							listeners	: {
								render:function(val){
									if(val.getValue()){
										img = new Uint8Array(val.getValue().split(","));
										blob = new Blob([img],{type:'image/png'})
										url = URL.createObjectURL(blob);
										this.up('form').down('[name=image]').setSrc(url);
									}else{
										this.up('form').down('[name=image]').setSrc('');
									}
								}
							}
						},{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '10 0 5 0',
							items	: [
								{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 20',
									items	: [
										{	fieldLabel	: Language.get('invc_numb','지시번호'),
											name		: 'wkod_numb',
											xtype		: 'textfield',
											labelWidth	: 80,
											hideTrigger	: true,
											readOnly	: true,
											width		: 290,
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield readonlyfield',
											cls			: 'textTemp',
											value		: select.get('invc_numb')
										},{	fieldLabel	: Language.get('acpt_numb','수주번호'),
											name		: 'wkod_numb',
											xtype		: 'textfield',
											value		: select.get('acpt_numb'),
											margin		: '0 0 0 10',
											hideTrigger	: true,
											labelWidth	: 90,
											height		: 40,
											readOnly	: true,
											width		: 335,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield readonlyfield',
											cls			: 'textTemp'
										},{	fieldLabel	: Language.get('','일지번호'),
											name		: 'invc_numb',
											xtype		: 'textfield',
											margin		: '0 0 0 10',
											labelWidth	: 95,
											readOnly	: true,
											multiSelect	: false ,
											editable	: false,
											width		: 320,
											height		: 40,
											value		: select.get('invc_numb'),
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield readonlyfield',
											cls			: 'textTemp',
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 20',
									items	: [
										{	fieldLabel	: Language.get('item_code','품목코드'),
											name		: 'item_code',
											xtype		: 'textfield',
											readOnly	: true,
											labelWidth	: 80,
											hideTrigger	: true,
											width		: 290,
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield readonlyfield',
											cls			: 'textTemp',
											value		: select.get('item_code')
										},{	fieldLabel	: Language.get('cvic_name','설비명'),
											name		: 'cvic_name',
											xtype		: 'textfield',
											margin		: '0 0 0 10',
											labelWidth	: 90,
											hideTrigger	: true,
											readOnly	: true,
											width		: 335 ,
											height		: 40,
											value		: select.get('cvic_name'),
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield readonlyfield',
											cls			: 'textTemp'
										},{	fieldLabel	: Language.get('work_sttm','작업시간'),
											name		: 'work_sttm',
											xtype		: 'timefield',
											format		: 'H:i',
											submitFormat: 'Hi',
											margin		: '0 0 0 10',
											hideTrigger	: true,
											labelWidth	: 95,
											value		: select.get('work_sttm'),
											minValue	: '00:00 AM',
											maxValue	: '23:59 PM',
											readOnly	: true,
											width		: 195,
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield readonlyfield',
											cls			: 'textTemp'
										},{	fieldLabel	: Language.get('','~'),
											name		: 'work_edtm',
											xtype		: 'timefield',
											format		: 'H:i',
											submitFormat: 'Hi',
											margin		: '0 0 0 10',
											hideTrigger	: true,
											labelWidth	: 15,
											value		: select.get('work_edtm'),
											minValue	: '00:00 AM',
											maxValue	: '23:59 PM',
											readOnly	: true,
											width		: 115,
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield readonlyfield',
											cls			: 'textTemp'
										},{	fieldLabel	: Language.get('item_code','품목코드'),
											name		: 'item_code',
											xtype		: 'textfield',
											readOnly	: true,
											labelWidth	: 95,
											margin		: '0 0 0 10',
											hideTrigger	: true,
											width		: 320,
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield readonlyfield',
											cls			: 'textTemp',
											value		: select.get('item_code')
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 20',
									items	: [
										{	fieldLabel	: Language.get('qc_poor_qntt','불량수량'),
											name		: 'qc_poor_qntt',
											xtype		: 'numericfield',
											margin		: '0 0 0 10',
											hideTrigger	: true,
											labelWidth	: 95,
											readOnly	: true,
											width		: 320,
											value		: select.get('qc_poor_qntt'),
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield readonlyfield',
											cls			: 'textTemp',
											hidden		: true
										},{	fieldLabel	: Language.get('item','품목'),
											name		: 'item_name',
											xtype		: 'textfield',
											value		: select.get('item_name'),
											labelWidth	: 80,
											hideTrigger	: true,
											readOnly	: true,
											width		: 965,
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield readonlyfield',
											cls			: 'textTemp'
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 20',
									items	: [
										{	fieldLabel	: Language.get('remk_text','비고사항'),
											name		: 'remk_text',
											xtype		: 'textfield',
											labelWidth	: 80,
											hideTrigger	: true,
											readOnly	: true,
											width		: 965,
											height		: 80,
											value		: select.get('remk_text'),
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'readonlyfield',
											fieldStyle	: 'text-align: left;font-size:19px !important; ',
											cls			: 'textTemp',
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '15 0 0 0',
									items	: [
										{	text : '<span class="btnTemp" style="font-size:2.5em;">불량보고</span>'  ,
											xtype : 'button',
											handler:  function(){
												var detail    = Ext.ComponentQuery.query('module-kortc-workentry-detail')[0],
													select    = detail.getSelectionModel().getSelection()[0]
												;
												if(!select){
													Ext.Msg.alert("알림","불량을 등록할 내역을 선택하여주십시오.");
												}else{
													me.poor()
												}
											},
											cls: 'button-left btn btn-danger',
											width: 150,
											height: 50,
											margin: '0 0 0 237'
										},{	text : '<span class="btnTemp" style="font-size:2.5em;">유실보고</span>'  ,
											xtype : 'button',
											handler:  function(){
												var detail    = Ext.ComponentQuery.query('module-kortc-workentry-detail')[0],
													select    = detail.getSelectionModel().getSelection()[0]
												;
												if(!select){
													Ext.Msg.alert("알림","유실 보고할 내역을 선택하여주십시오.");
												}else{
													me.fail()
												}
											},
											cls: 'button-left btn btn-warning',
											width: 150,
											height: 50,
											margin: '0 0 0 446'
										}
									]
								}
							]
						}
					]
				},{	xtype : 'module-kortc-workentry-poor', region:'west' , flex : 1, height:300 ,margin: '0 0 0 17'
				},{	xtype : 'module-kortc-workentry-fail',region:'center', flex : 1, height:300 ,margin: '0 17 0 0'
				}
			],
			buttons: [
				{	text	: '<span class="btnTemp" style="font-size:3em">닫기</span>',
					cls		: 'button-style',
					flex	: 1,
					height	:50,
					handler	: function() {
						Ext.ComponentQuery.query('#info')[0].up('window').destroy();
					}
				}
			]
		});


		win = Ext.widget('window', {
			title		: '<span class="btnTemp" style="font-size:15px; color:black;">생산정보</span>',
			closeAction	: 'destory',
			width		: 1249,
			height		: 844,
			layout		: 'fit',
			resizable	: true,
			modal		: true,
			items		: form,
			defaultFocus: ''
		});
		win.show();
		win.tools.close.hide ();  // 닫기버튼 hide
	},
	//TODO 근무조교대
	shiftWork : function(){
		var me			= this,
			search		= Ext.ComponentQuery.query('module-kortc-workentry-search')[0],
			searchDate	= search.down('[name=work_date]').getValue(),
			lister		= Ext.ComponentQuery.query('module-kortc-workentry-lister')[0],
			detail		= Ext.ComponentQuery.query('module-kortc-workentry-detail')[0],
			store		= lister.getStore(),
			store2		= detail.getStore(),
			select		= detail.getSelectionModel().getSelection()[0],
			dayshift	= new Date(new Date().setHours(07,00,0,0)),
			nightshift	= new Date(new Date().setHours(19,00,0,0)),
			shiftvalue,chekdayn
		;
		if(select){
			if(select.get('dayn_dvcd')==2){
				shiftvalue = dayshift;
				chekdayn = '1';
			}else{
				shiftvalue = nightshift;
				chekdayn = '2';
			}
			var form	= Ext.widget('form', {
				border	:false,
				layout	: 'vbox',
				items	: [
					{	border: false,
						itemId: 'shift',
	//					title:'<span style="text-align:center;font-size:1.5em; color:black;" class="btnTemp">전 근무조</span>',
						bodyPadding: '0 0 0 10',
						width: 500,
						fieldDefaults  : {
							labelWidth : 160,
							labelStyle : 'text-align:right',
							labelSeparator : '',
						},
						items:[
							{	fieldLabel	: Language.get('work_endd_date','마감일자'),
								name		: 'work_endd_date',
								xtype		: 'datefield',
								width		: 435,
								height		: 40,
								labelWidth	: 160,
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field readonlyfield',
								cls			: 'textTemp',
								maxValue	: new Date(),
								trigger1Cls : _global.options.work_book_tema+'dateTrigger',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: searchDate,
								readOnly	: true,
								margin		: '20 0 0 0',
								labelSeparator : '',
							},{	fieldLabel	: Language.get('work_edtm','마감시간'),
								name		: 'work_edtm',
								xtype		: 'timefield',
								format		: 'H:i',
								submitFormat: 'Hi',
								margin		: '10 0 0 0',
								hideTrigger	: true,
								value		: shiftvalue,
								readOnly	: true,
								minValue	: '00:00 AM',
								maxValue	: '23:59 PM',
								width		: 435,
								height		: 40,
								labelWidth	: 160,
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field readonlyfield',
								cls			: 'textTemp',
								listConfig:{
									itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
								},
								labelSeparator : '',
							},{	fieldLabel	: Language.get('prod_qntt','생산수량'),
								name		: 'prod_qntt',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								readOnly	: false,
								width		: 435,
								height		: 40,
								labelWidth	: 160,
								value		: select.get('prod_qntt'),
								margin		: '10 0 10 0',
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								hideTrigger	: true,
								handleMouseEvents:true,
								listeners:{
									render:function(field ){
										field.getEl().on('click', function( event, el ) {
											var trigger1 = Ext.dom.Query.select('.trigger1')[0];
											console.log(Ext.dom.Query.select('.trigger1')[0]);
											Ext.get(trigger1).dom.click();
										});
									}
								},
								popup: {
									select	: 'SINGLE',
									widget	: 'lookup-keypad-popup',
									params	: { stor_grp : _global.stor_grp},
									result	: function(records, nameField, pairField){
										nameField.setValue(records[0].result);
									}
								},
								trigger1Cls : 'hideCls trigger1',
								labelSeparator : '',
							},{	fieldLabel	: Language.get('dsct_resn_dvcd', '중단사유'),
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
								xtype		: 'lookupfield',
								name		: 'dsct_resn_dvcd',
								trigger1Cls : _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
								width		: 395,
								margin		: '10 0 10 0',
								lookupValue	: resource.lookup('dsct_resn_dvcd'),
								height		: 40,
								labelWidth	: 160,
								multiSelect	: false ,
								editable	: false,
								hidden		: true,
								listConfig:{
									itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
								},
								labelSeparator : '',
							},{	fieldLabel	: Language.get('dayn_dvcd2', '마감조'),xtype		: 'lookupfield',
								lookupValue	: resource.lookup('dayn_dvcd'),
								name		: 'dayn_dvcd2',
								hidden		: false,
								width		: 435,
								height		: 40,
								labelWidth	: 160,
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field readonlyfield',												// field에 클래스추가
								value		: select.get('dayn_dvcd'),
								listConfig:{
									itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
								},
								readOnly	: true,
								labelSeparator : '',
							}

						]
					},{	border: false,
						bodyPadding: 10,
						width: 500,
						title:'<span style="text-align:center;font-size:1.5em; color:black;" class="btnTemp">교대시작</span>',
						fieldDefaults: {
							labelWidth: 160,
							labelStyle: 'text-align:right',
							labelSeparator : '',
						},
						items:[
							{	fieldLabel	: Language.get('invc_date','교대일자'),
								name		: 'invc_date',
								xtype		: 'datefield',
								value		: searchDate,
								width		: 435,
								height		: 40,
								labelWidth	: 160,
								readOnly	: true,
								margin		: '20 0 0 0',
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field readonlyfield',
								cls			: 'textTemp',
								trigger1Cls : _global.options.work_book_tema+'dateTrigger',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								maxValue	: new Date(),
								labelSeparator : '',
							},{	fieldLabel	: Language.get('work_sttm','교대시간'),
								name		: 'work_sttm',
								xtype		: 'timefield',
								format		: 'H:i',
								margin		: '10 0 0 0',
								submitFormat: 'Hi',
								hideTrigger	: true,
								readOnly	: true,
								value		: shiftvalue,
								minValue	: '00:00 AM',
								maxValue	: '23:59 PM',
								width		: 435,
								labelWidth	: 160,
								height		: 40,
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field readonlyfield',
								cls			: 'textTemp',
								listConfig:{
									itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
								},
								labelSeparator : '',
							},{	fieldLabel	: Language.get('wker_name','작업관리자'),
								value		: '',
								width		: 395,
								labelWidth	: 160,
								height		: 40,
								margin		: '10 0 0 0',
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'wker_name',
								pair		: 'wker_idcd',
								trigger1Cls : _global.options.work_book_tema+'searchTrigger',
								clearable	: false ,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-workentry-user-popup',
									params : { stor_grp : _global.stor_grp , row_sts : '0'},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
									}
								},
								labelSeparator : '',
							},{	name : 'wker_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('dayn_dvcd', '교대조'),xtype		: 'lookupfield',
								lookupValue	: resource.lookup('dayn_dvcd'),
								name		: 'dayn_dvcd',
								margin		: '10 0 0 0',
								hidden		: false,
								width		: 435,
								labelWidth	: 160,
								height		: 40,
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field readonlyfield',												// field에 클래스추가
								value		: chekdayn,
								listConfig:{
									itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
								},
								readOnly	: true,
								labelSeparator : '',
							}
						],
						buttons: [
							{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
								cls: 'button-style',
								flex:1,
								height:50,
								handler: function() {
									var param = Ext.merge(form.getValues() );
										sttm_temp2 = select.get('work_strt_dttm').replace(/-/gi,""),
										sttm_temp1 = sttm_temp2.replace(/:/gi,""),
										sttm_temp  = sttm_temp1.replace(/\s/gi, ""),
										sttm_hour = sttm_temp.substring('8','10');
										edtm_hour = param.work_edtm.substring('0','2');
										sttm_min = sttm_temp.substring('10','12');
										edtm_min = param.work_edtm.substring('2','4');
									var time = 0;
									var min   = edtm_min-sttm_min;
									if(param.dayn_dvcd==1){
										time  = (24+Number(edtm_hour)) - Number(sttm_hour);
									}else{
										time  = edtm_hour-sttm_hour;
									}
									if(min < 0){
										time = time-1;
										min  = edtm_min-sttm_min + 60;
									}
									var total = (time*60)+min;
									if(!param.prod_qntt ||param.prod_qntt <= 0){
										Ext.Msg.alert("알림","생산수량을 입력해주세요.");
										return;
									}else if(!param.wker_name){								// 이전 두인요청으로 주석처리되었던 것을 다시 원복요청하여 해제 (2020 10 15 장우영)
										Ext.Msg.alert("알림","작업자를 선택해주세요.");
										return;
									}else{

										record = Ext.create( store.model.modelName , {
											invc_numb		: select.get('invc_numb'),
											wkod_numb		: select.get('wkod_numb'),
											wkod_seqn		: select.get('wkod_seqn'),
											cvic_idcd		: select.get('cvic_idcd'),
											pdsd_numb		: select.get('pdsd_numb'),
											work_sttm		: select.get('work_sttm'),
											item_idcd		: select.get('item_idcd'),
											work_edtm		: param.work_edtm+'00',
											invc_date		: select.get('invc_date'),
											prod_qntt		: param.prod_qntt,
											dsct_resn_dvcd	: param.dsct_resn_dvcd,
											need_time		: total,
											work_endd_date	: param.work_endd_date,
											sysm_memo		: select.get('sysm_memo')
//													dayn_dvcd		: param.dayn_dvcd
										});
										store.add(record);
										store.sync({
											callback: function(batch, options) {

											} ,
											scope: this
										},{	synchro : _global.objects.synchro,_set : 'shiftWork'} );
										store.clearData();
										store.loadData([],false);
										store.reload();
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
											invc_numb		: new_invc_numb,
											indn_qntt		: select.get('indn_qntt'),
											pdsd_numb		: select.get('pdsd_numb'),
											wkod_numb		: select.get('wkod_numb'),
											wkod_seqn		: select.get('wkod_seqn'),
											item_idcd		: select.get('item_idcd'),
											invc_date		: param.invc_date,
											wker_idcd		: param.wker_idcd,
											dayn_dvcd		: param.dayn_dvcd,
											work_sttm		: param.work_sttm+'00',
											cvic_idcd		: select.get('cvic_idcd'),
											mold_idcd		: select.get('mold_idcd'),
											mtrl_bacd		: select.get('mtrl_bacd'),
											lott_numb		: select.get('lott_numb'),
											cavity			: select.get('cavity'),
											sysm_memo		: select.get('sysm_memo')
										});
										store.add(record);
										store.sync({
											callback: function(batch, options) {
												Ext.Ajax.request({
													url			: _global.location.http() + '/custom/kortc/prod/workentry/set/cyclTime.do',
													method		: "POST",
													params		: {
														token	: _global.token_id,
														param	: Ext.encode({
															invc_numb	: new_invc_numb,
															cycl_time	: select.get('work_cycl_time'),
														})
													},
													success : function(response, request) {
														store2.reload();
													},
													failure : function(response, request) {
														resource.httpError(response);
													},
													callback : function() {
													}
												});
												store.reload();
												store2.reload();
												this.up('form').getForm().reset();
												this.up('window').destroy();
											} ,
											scope: this
										},{	synchro : _global.objects.synchro,_set : 'insert'} );
									}
								}
							},
							{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
								cls: 'button-style',
								flex:1,
								height:50,
								handler: function() {
//									form.getForm().reset();

									Ext.ComponentQuery.query('#shift')[0].up('window').destroy();
								}
							}
						]
					}
				]
			});
			win = Ext.widget('window', {
				title: '<span class="btnTemp" style="font-size:15px; color:black;">교대마감</span>',
				closeAction: 'destory',
				width: 510,
				height: 600,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: ''
			});
		win.show();
		win.tools.close.hide ();  // 닫기버튼 hide
		}else{
			Ext.Msg.alert("알림","근무교대할 작업을 선택해주십시오.");
		}
	},
});
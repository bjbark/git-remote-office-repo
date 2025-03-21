Ext.define('module.custom.sjflv.sale.sale.salework.view.SaleWorkListerMaster', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-salework-lister-master',
	store		: 'module.custom.sjflv.sale.sale.salework.store.SaleWorkListerMaster',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'-', '-', '-',
					{	text : '<span class="write-button">거래명세서 출력</span>', action : 'printAction',cls: 'button1-style', width: 110 },
					{	text : '<span class="write-button">세금계산서 발행</span>'	, action : 'reportAction'	, cls: 'button1-style' ,width:  110,	} , '-',
					{	text : '<span class="write-button">세금계산서 전송</span>'	, action : 'sendAction'		, cls: 'button1-style' ,width:  110,	} , '-',
					{	text : '<span class="write-button">세금계산서 삭제</span>'	, action : 'deleteAction'	, cls: 'button1-style' ,width:  110,	} , '-',
					{	text : '<span class="write-button">메일 재전송</span>'		, action : 'resendAction'	, cls: 'button-style'  ,width:  110,	} , '-',
					'->', '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , itemId:'saleWorkMaster'  , cls: 'button-style'},
				]
			};
		return item ;
	},

	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	dataIndex:	'trsm_yorn'		, width:  60, align : 'center'	, text: Language.get( 'trsm_yorn'		, '전송여부'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex:	'trsm_dttm'		, width: 120, align : 'center'	, text: Language.get( 'trsm_dttm'		, '전송일자'		)
					},{	dataIndex:	'trsm_dvcd'		, width: 60, align : 'center'	, text: Language.get( 'trsm_dvcd'		, '전송형태'		),xtype:'lookupcolumn',lookupValue:resource.lookup('trsm_dvcd')
					},{	dataIndex:	'cstm_code'		, width: 100, align : 'center'	, text: Language.get( 'cstm_code'		, '거래처코드'	)
					},{	dataIndex:	'cstm_name'		, width: 200, align : 'left'	, text: Language.get( 'cstm_name'		, '거래처명'		)
					},{	dataIndex:	'mail_addr'		, width: 170, align : 'left'	, text: Language.get( 'mail_addr'		, '이메일'		)
					},{	dataIndex:	'publ_date'		, width: 100, align : 'center'	, text: Language.get( 'publ_date'		, '발행일자'		)
					},{	dataIndex:	'rqod_rcvd_dvcd', width:  80, align : 'center'	, text: Language.get( 'rqod_rcvd_dvcd'	, '영수/청구'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('rqod_rcvd_dvcd')
					},{ dataIndex:	'baro_stat'		, minWidth: 200, flex :  1, align : 'center'	, text : Language.get('baro_stat'		,'진행상태'	),
						sortable: false,
						renderer: function(value, meta, record){
							var text = "";
							var val = 0;

							text=value;
							pt = val/100;
							var id = Ext.id();
							Ext.defer(function (id,pt) {
								var p = Ext.create('Ext.ProgressBar',{
									renderTo: id,
									animate	: true,
									width	: '100%',
									value	: pt,
									text	: text,
								});
							}, 50, undefined, [id,pt]);
							return "<div id='" + id + "'></div>";
						}
					},{ header: '계산서 확인/취소',
						sortable: false,
						align : 'center',
						width:  150,
						renderer: function(val,meta,rec) {
							var id = Ext.id();
							Ext.defer(function() {
								Ext.widget('button', {
									renderTo: Ext.query("#"+id)[0],
									text: '확인',
									margin:'0 10 0 0',
									handler: function(){me.check(rec)}
								});
								Ext.widget('button', {
									renderTo: Ext.query("#"+id)[0],
									text: '변경',
									margin:'0 10 0 0',
									handler: function(){me.modify(rec)}
								});
								Ext.widget('button', {
									renderTo: Ext.query("#"+id)[0],
									text: '취소',
									handler: function(){me.cancel(rec)}
								});
							}, 50);
							return Ext.String.format('<div id="{0}"></div>', id);
						},
						dataIndex: 'somefieldofyourstore'
					},{	dataIndex:	'dept_name'		, width: 100, align : 'left'	, text: Language.get( 'dept_name'		, '부서'			)
					},{	dataIndex:	'drtr_name'		, width:  90, align : 'left'	, text: Language.get( 'drtr_name'		, '담당자'		)
					},{	dataIndex:	'sply_amnt'		, width: 150, align : 'right'	, text: Language.get( 'sply_amnt'		, '공급가'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'vatx_amnt'		, width: 150, align : 'right'	, text: Language.get( 'vatx_amnt'		, '부가세'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'ttsm_amnt'		, width: 190, align : 'right'	, text: Language.get( 'ttsm_amnt'		, '합계금액'		), xtype : 'numericcolumn', summaryType: 'sum'
					}
				]
			};
		return item;
	}
	,cancel : function(rec){
		var me = this;
		var id,buss_numb;

		Ext.Ajax.request({
			url			: _global.location.http() + '/barobill/get/baro_logn.do',
			params		: {
				token	: _global.token_id ,
				param	: JSON.stringify({
					stor_id	: _global.stor_id,
					user_idcd : _global.login_pk,
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if(result.records.length ==0){
					chk = 0;
				}else{
					id = result.records[0].lgin_idcd;
					buss_numb = result.records[0].buss_numb;
				}
			}
		});
		if(id){
			var code = '';
			Ext.Ajax.request({
				url			: _global.location.http() + '/barobill/set/procTaxInvoice.do',
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						lgin_idcd  : id,
						invc_numb  : rec.data.invc_numb,
						buss_numb  : buss_numb,
						type       : "ISSUE_CANCEL"
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					code = result.records
				}
			});
			if(code!=""){
				Ext.Msg.alert('알림',code);
			}else{
				Ext.Ajax.request({
					url			: _global.location.http() + '/barobill/set/DeleteTax.do',
					params		: {
						token	: _global.token_id ,
						param	: JSON.stringify({
							lgin_idcd  : id,
							invc_numb  : rec.data.invc_numb,
							buss_numb  : buss_numb,
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						code = result.records
					}
				});
				if(code!=""){
					Ext.Msg.alert('알림',code);
				}else{
					me.getStore().reload();
				}
			}
		}else{
			Ext.Msg.alert('알림','등록된 아이디가 없습니다. 회원가입 진행 후 시도해주세요.');
		}
	}
	,check : function(rec){
		var me = this;
		var id,buss_numb;

		Ext.Ajax.request({
			url			: _global.location.http() + '/barobill/get/baro_logn.do',
			params		: {
				token	: _global.token_id ,
				param	: JSON.stringify({
					stor_id	: _global.stor_id,
					user_idcd : _global.login_pk,
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if(result.records.length ==0){
					chk = 0;
				}else{
					id = result.records[0].lgin_idcd;
					buss_numb = result.records[0].buss_numb;
				}
			}
		});
		if(id){
			var code = '';
			Ext.Ajax.request({
				url			: _global.location.http() + '/barobill/get/barobillInvoiceURL.do',
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						lgin_idcd  : id,
						invc_numb  : rec.data.invc_numb,
						buss_numb  : buss_numb
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					code = result.records
				}
			});
			if(code.indexOf("https")==0){
				window.open(code,"세금계산서 확인","toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=1200,height=800");
			}else{
				Ext.Msg.alert('알림',code);
			}

		}else{
			Ext.Msg.alert('알림','등록된 아이디가 없습니다. 회원가입 진행 후 시도해주세요.');
		}
	}
	,modify : function(rec){
		var me = this;
		var id,buss_numb,
		line_clos = rec.get('line_clos')
		;

		if(line_clos == '1'){
			Ext.Msg.alert('알림','최종발행된 계산서가 아닙니다.<p><p> 변경할 수 없습니다.');
			return
		}

		if(rec.get('baro_stat')=="국세청 전송성공"){
			Ext.Ajax.request({
				url			: _global.location.http() + '/barobill/get/baro_logn.do',
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						stor_id	: _global.stor_id,
						user_idcd : _global.login_pk,
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if(result.records.length ==0){
						chk = 0;
					}else{
						id = result.records[0].lgin_idcd;
						buss_numb = result.records[0].buss_numb;
					}
				}
			});

			if(id){
				var code = '';
				//받는 값이 없어서 result는 쓸 수 없음.
				resource.loadPopup({
					widget : 'module-salework-modify-popup',
					params : {invc_numb : rec.get('invc_numb'),lgin_idcd:id,select : rec},
				});

			}else{
				Ext.Msg.alert('알림','등록된 아이디가 없습니다. 회원가입 진행 후 시도해주세요.');
			}
		}else{
			Ext.Msg.alert('알림','변경할 수 없는 상태입니다.');
		}
	}
 });
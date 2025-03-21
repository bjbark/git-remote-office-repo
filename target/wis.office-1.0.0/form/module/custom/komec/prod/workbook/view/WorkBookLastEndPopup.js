Ext.define('module.custom.komec.prod.workbook.view.WorkBookLastEndPopup', { extend: 'Axt.popup.Search',
  id 		: 'module-komec-workbook-lastend-popup',
  alias	: 'widget.module-komec-workbook-lastend-popup',
  store	: 'module.custom.komec.prod.workbook.store.WorkBookLastEndPopup',

  title	: Language.get('lastEnd','종료'),
  closable: true,
  autoShow: true,
  width		: 825,
  height	: 550,
  layout	: {type: 'border'},
  multiSelect: true, // 다중 선택 여부
  matcode : undefined,
  matname : undefined,
  defaultFocus : 'initfocused',
  initComponent: function(config){
    var me = this;

	    me.items = [me.createForm()];
	    me.callParent(arguments);
	    me.selectAction();
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
        items		: [ me.createGrid() ]  //me.createToolbar(),
      };
    return form;
  },

  /**
   * 리스트
   * @return {Ext.grid.Panel} 리스트 그리드
   */
  createGrid: function(){
    var me = this,
      grid = {
        xtype		: 'grid-panel',
        region		: 'center',
        cls			: _global.options.work_book_tema+'grid',
        multiSelect : true, // 다중 선택 여부
        viewConfig	: { loadMask	: new Ext.LoadMask( me , { msg: Const.SELECT.mask  } ) },
        selModel	: {	selType: 'checkboxmodel', mode :'SINGLE'},
        features	: [ {ftype :'grid-summary'} ],
        plugins 	: { ptype  :'cellediting-directinput', clicksToEdit: 1 },
        store		: Ext.create(me.store),
        dockedItems	: {
          xtype		: 'toolbar',
          dock		: 'bottom',
          items		: [
            {xtype: 'button' , text : '<span class="btnTemp">삭제</span>', iconCls: Const.DELETE.icon , scope: me, handler: me.deleteAction, cls: 'button1-style', width: 150,height:50, margin: ' 0  0  0 20'},'->',
            {xtype: 'button' , text : '<span class="btnTemp">추가</span>', iconCls: Const.UPDATE.icon , scope: me, handler: me.insertAction, cls: 'button-style' , width: 150,height:50, margin: ' 0 10  0  0'},'-',
            {xtype: 'button' , text : '<span class="btnTemp">완료</span>', iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style' , width: 150,height:50, margin: ' 0 10  0  0'},'-',
            {xtype: 'button' , text : '<span class="btnTemp">닫기</span>', iconCls: Const.CLOSER.icon , scope: me, handler: me.close       , cls: 'button-style' , width: 150,height:50, margin: ' 0  0  0  0'}
          ]
        },
        columns: [
          {	dataIndex: 'work_endd_dttm'		, text : Language.get('work_endd_dttm'		,'완료일시'	) , flex : 1,
            renderer: function(value, meta){
              meta.style = 'font-size:2em !important;height:50px;line-height:50px;'; // applied style for DIV element
              return value;
            },
          },{	dataIndex: 'prod_qntt'		, text : Language.get(	'prod_qntt'	,'완료수량'	) , width : 120 ,name:'qntt', summaryType: 'sum' ,
              renderer: function(value, meta){
                  meta.style = 'font-size:2em !important;height:50px;line-height:50px;'; // applied style for DIV element
                  return Ext.util.Format.number(value,'0,000');
              },
              tdCls	: 'editingcolumn',
				editor	: {
					xtype		: 'textfield',
					height		: 50,
					editable	: true,
					enableKeyEvents : true,
					selectOnFocus: true,
					allowBlank	: false,
					listeners: {
						change: function(editor, newValue, oldValue, eOpts) {
							var grid = editor.up('grid'); // 그리드를 참조합니다.
							var store = grid.getStore(); // 그리드의 스토어를 가져옵니다.
							var record = grid.getSelectionModel().getSelection()[0];

							if (record) {
								record.set('prod_qntt', editor.getValue());
								record.commit(); // 변경 사항을 커밋하여 반영
//								grid.getView().refresh();
							}
						}
					}
				}
			},
		],
	};
	return grid;
	},


  /**
   * 조회
   */
  selectAction: function(){
    var me		= this,
    	grid    = me.down('grid'),
      	store	= grid.getStore()
    ;
    store.load({
      params	:
  		{	param : JSON.stringify({
  				wkod_numb : me.popup.param.wkod_numb,
  				wkod_seqn : me.popup.param.wkod_seqn
  			})
		},
      scope		: me,
      callback	: function(records, operation, success) {
      }
    });
  },
  /**
   * 추가 버튼 이벤트
   */
	  insertAction: function (grid, rowIndex, colIndex, item, e, record) {
		var me = this,
			store 	= me.down('grid').getStore(),
			mainpopup = Ext.ComponentQuery.query('lookup-komec-workbook-main-popup')[0],
			lister = mainpopup.down('[itemId=mainLister]'),
			select = lister.getSelectionModel().getSelection()[0]
		;
		var popup = resource.loadPopup({
			widget : 'module-komec-workbook-end-popup',
			param  : {
				dvcd : '1'
			},
			result:function(response){
				var qntt = response.endd_qntt,
					new_invc_numb = "",
					params = me.popup.param
				;
				if(select.get('work_endd_dttm')==""){
					new_invc_numb = select.get('work_numb');
				}else{
					Ext.Ajax.request({
						url			: _global.location.http() + '/listener/seq/maxid.do',
						params		: {
							token	: _global.token_id ,
							param	: JSON.stringify({
								stor_id	: _global.stor_id,
								table_nm: 'work_book'
							})
						},
						async	: false,
						method	: 'POST',
						success	: function(response, request) {
							var result = Ext.decode(response.responseText);
							new_invc_numb = result.records[0].seq;
						}
					});
				}
				var work_strt_date = Ext.Date.format(new Date(select.get('work_strt_dttm')),'YmdHis');
				Ext.Ajax.request({
					url			: _global.location.http() + '/custom/komec/prod/workbook/set/lastWorkBook.do',
					params		: {
						token	: _global.token_id ,
						param	: JSON.stringify({
							new_invc_numb: new_invc_numb,
							indn_qntt : qntt,
							item_idcd : select.get('item_idcd'),
							cvic_idcd : _global.login_pk,
							wkct_idcd : select.get('wkct_idcd'),
							wkfw_idcd : select.get('wkfw_idcd'),
							cstm_idcd : select.get('cstm_idcd'),
							invc_numb : select.get('invc_numb'),
							line_seqn : select.get('line_seqn'),
							work_strt_dttm : work_strt_date,
							lott_numb : select.get('lott_numb'),
							prod_qntt : qntt,
							stok_qntt : qntt
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						store.reload();
						popup.close();
					}
				});
			}
		});


		},

	  /**
	   * 삭제 버튼 이벤트
	   */
	deleteAction : function (config) {
		 var me  = this;
		 	 store	 = me.down('grid').getStore(),
		     records  = me.down('grid').getSelectionModel().getSelection(),
		 	 params  = me.params
		 ;
	 	 if(records.length > 0){
			 for(var i = 0; i<records.length;i++){
				var record = [];
				var mask 	= new Ext.LoadMask(Ext.getBody(), {msg: Const.DELETE.mask });
				mask.show();
				Ext.Ajax.request({
					url		: _global.location.http() + '/custom/komec/prod/workbook/set/lastDeleteBook.do',
					params	: {
						token : _global.token_id,
						param	: JSON.stringify({
							invc_numb : records[i].get('invc_numb'),
							wkod_seqn : records[i].get('wkod_seqn'),
							wkod_numb : records[i].get('wkod_numb'),
							lott_numb : records[i].get('lott_numb'),
						})
					},
					async	: false,
					method	: 'POST',
					success : function(operation){
						store.reload();
					},
					failure : function(operation){ },
					callback: function(operation){  // 성공 실패 관계 없이 호출된다.
						mask.hide();
					}
				});
			 }
	 	 }else{
	 		 Ext.Msg.alert('알림','삭제할 항목을 선택하세요..');
	     }
	  },

	  /**
	   * 저장 버튼 이벤트
	   */
	  finishAction: function(){
		var me			= this,
			mainpopup = Ext.ComponentQuery.query('lookup-komec-workbook-main-popup')[0],
			lister = mainpopup.down('[itemId=mainLister]'),
			store = lister.getStore(),
			select = lister.getSelectionModel().getSelection()[0],
			qntt = 0
		;
		var grid = me.down('grid');// 그리드를 참조합니다.
		var record = grid.getSelectionModel().getSelection()[0];

		if (record && record.data) {
		    if (!record.data.prod_qntt) {
		        qntt = select.get('indn_qntt');
		    } else if (record.data.prod_qntt) {
		        qntt = record.data.prod_qntt;
		    }
		} else {
			qntt = select.get('indn_qntt');
		}

		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/komec/prod/workbook/set/lastEnd.do',
			params	: {
				token : _global.token_id,
				param	: JSON.stringify({
					invc_numb : select.get('invc_numb'),
					line_seqn : select.get('line_seqn'),
					work_numb : select.get('work_numb'),
					qntt      : qntt,
				})
			},
			async	: false,
			method	: 'POST',
			success : function(operation){
				store.reload();
				me.close();
			},
			failure : function(operation){ },
			callback: function(operation){  // 성공 실패 관계 없이 호출된다.
//				mask.hide();
			}
		});
	},
});

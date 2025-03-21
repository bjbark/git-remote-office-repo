Ext.define('module.prod.wmoldw.moldcheck.view.WmoldCheckListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-wmoldcheck-lister-master',
	store		: 'module.prod.wmold.wmoldcheck.store.WmoldCheckMaster',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
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
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{ dataIndex: 'mold_code'		, text : Language.get('acpt_numb'		,'목형코드'			) , width : 120 , align : 'center'
					},{ dataIndex: 'mold_name'		, text : Language.get('acpt_case_name'	,'목형명'			) , width : 170 , align : 'left'
					},{ dataIndex: 'stor_plac'		, text : Language.get('stor_plac'		,'위치'			) , width : 80  , align : 'left'
					},{ dataIndex: 'owne_riht'		, text : Language.get('owne_riht'		,'소유권'			) , width : 100 , align : 'left'
					},{ dataIndex: 'egrv_numb'		, text : Language.get('egrv_numb'		,'각인번호'			) , width : 80  , align : 'center'
					},{ dataIndex: 'cavity'			, text : Language.get('cavity'			,'CAVITY'		) , width : 70  , align : 'center'
					},{ dataIndex: 'make_cmpy_name'	, text : Language.get('make_cmpy_name'	,'제작처'			) , width : 80  , align : 'left'
					},{ dataIndex: 'make_date'		, text : Language.get('make_date'		,'제작일'			) , width : 80  , align : 'center'
					},{ dataIndex: 'rcpt_cmpy_name'	, text : Language.get('rcpt_cmpy_name'	,'전인수업체'		) , width : 100 , align : 'left',
					},{ dataIndex: 'norm_yorn'		, text : Language.get('norm_yorn'		,'양산여부'			) , width : 60  , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center'
					},{ dataIndex: 'mold_spec'		, text : Language.get('mold_spec'		,'목형규격'			) , width : 130 , align : 'left',
					},{ dataIndex: 'mtrl_name'		, text : Language.get('mtrl_name'		,'재질'			) , width : 100 , xtype : 'lookupcolumn', lookupValue : resource.lookup('mtrl_dvcd'), align : 'center'
					},{ dataIndex: 'grad_name'		, text : Language.get('grad_name'		,'GRADE'		) , width : 100 , xtype : 'lookupcolumn', lookupValue : resource.lookup('grad_dvcd'), align : 'center'
					},{ dataIndex: 'runr_wigt'		, text : Language.get('runr_wigt'		,'런너중량'			) , width : 80  , align : 'right' , xtype : 'numericcolumn'
					},{ dataIndex: 'prod_wigt'		, text : Language.get('prod_wigt'		,'제품중량'			) , width : 80  , align : 'right' , xtype : 'numericcolumn'
					},{ dataIndex: 'cycl_time'		, text : Language.get('cycl_time'		,'C/T(sec)'		) , width : 70  , align : 'right' , xtype : 'numericcolumn'
					},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		,'비고'			) , width : 150 , align : 'left',
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'고객사'			) , width : 80 , align : 'left',
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'목형상태'			) , width : 150 , align : 'left',
					}
				]
			}
		;
		return item;
	}
});

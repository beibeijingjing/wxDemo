package weixin.manager.service;

import weixin.manager.bean.WxImgText;
import core.exception.WxBaseException;
import core.service.IBaseService;

public interface WxImgTextService extends IBaseService<WxImgText> {

	public void addSynImgTextOne(WxImgText imgText) throws WxBaseException;

	public void updateSynImgTextOne(WxImgText imgText) throws WxBaseException;

	public void deleteSynImgText(String mediaId) throws WxBaseException;

}
import { atom } from 'recoil';
import url from 'url';

enum AppStateKeys {
  CollectionId = 'collectionId',
}

const { query } = url.parse(window?.location?.href ?? '', true);

const collectionId = atom<string>({
  key: AppStateKeys.CollectionId,
  default: query?.collectionId as string ?? '',
});

const AppState = {
  collectionId,
};

export default AppState;
